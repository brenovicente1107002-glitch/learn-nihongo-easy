import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eraser, Eye, EyeOff } from "lucide-react";

type Props = {
  /** caractere que deve ser desenhado */
  char: string;
  /** avisa o componente pai se já houve traço suficiente */
  onDraw?: (temTraco: boolean) => void;
  /** limpa o desenho quando este valor muda */
  resetKey?: string | number;
};

/** Área de escrita à mão: o aluno desenha o kanji/kana por cima do guia. */
export function DrawCanvas({ char, onDraw, resetKey }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const desenhando = useRef(false);
  const pontos = useRef(0);
  const [guia, setGuia] = useState(true);
  const [temTraco, setTemTraco] = useState(false);

  const limpar = useCallback(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    pontos.current = 0;
    setTemTraco(false);
    onDraw?.(false);
  }, [onDraw]);

  useEffect(() => {
    limpar();
    setGuia(true);
  }, [resetKey, limpar]);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * c.width, y: ((e.clientY - r.top) / r.height) * c.height };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    desenhando.current = true;
    const { x, y } = pos(e);
    ctx.lineWidth = 14;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = getComputedStyle(canvasRef.current!).color;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!desenhando.current) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    pontos.current += 1;
    if (pontos.current > 6 && !temTraco) {
      setTemTraco(true);
      onDraw?.(true);
    }
  };

  const end = () => {
    desenhando.current = false;
  };

  return (
    <div className="space-y-3">
      <div className="relative mx-auto aspect-square w-full max-w-72 overflow-hidden rounded-2xl border-2 border-b-4 border-border bg-card">
        {/* linhas guia */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 h-px w-full bg-border" />
          <div className="absolute left-1/2 h-full w-px bg-border" />
        </div>
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[9rem] leading-none transition-opacity select-none",
            guia ? "text-muted-foreground/25" : "opacity-0",
          )}
        >
          {char}
        </div>
        <canvas
          ref={canvasRef}
          width={512}
          height={512}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          className="absolute inset-0 h-full w-full touch-none text-primary"
        />
      </div>
      <div className="flex justify-center gap-2">
        <Button type="button" size="sm" variant="outline" onClick={limpar}>
          <Eraser className="mr-2 h-4 w-4" />
          Limpar
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => setGuia((g) => !g)}>
          {guia ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
          {guia ? "Esconder guia" : "Mostrar guia"}
        </Button>
      </div>
    </div>
  );
}
