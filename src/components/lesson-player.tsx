import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { speakJa, ttsDisponivel } from "@/lib/tts";
import type { QuizQuestion } from "@/lib/srs";
import { Check, Heart, Volume2, X } from "lucide-react";

type Props = {
  questions: QuizQuestion[];
  onFinish: (accuracy: number) => void;
  onExit?: () => void;
  titulo?: string;
};

/** Sessão de exercícios estilo Duolingo: barra de progresso, vidas e feedback imediato. */
export function LessonPlayer({ questions, onFinish, onExit, titulo }: Props) {
  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [vidas, setVidas] = useState(3);

  const q = questions[index];
  const audio = q?.audio;

  useEffect(() => {
    if (audio) speakJa(audio);
  }, [audio]);

  const progresso = useMemo(() => Math.round((index / Math.max(total, 1)) * 100), [index, total]);

  if (!q) return null;

  const correto = selected === q.answer;

  const verificar = () => {
    if (selected === null) return;
    setChecked(true);
    if (selected === q.answer) setAcertos((a) => a + 1);
    else setVidas((v) => Math.max(0, v - 1));
  };

  const continuar = () => {
    if (vidas === 0 || index + 1 >= total) {
      onFinish(acertos / total);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setChecked(false);
  };

  return (
    <div className="space-y-6">
      {/* topo: sair, progresso, vidas */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onExit}
          aria-label="Sair da lição"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-primary">
          <Heart className="h-5 w-5 fill-current" />
          <span className="font-display text-sm font-bold">{vidas}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {q.tag && <Badge variant="outline">{q.tag}</Badge>}
        <span className="text-xs text-muted-foreground">
          {index + 1} de {total}
          {titulo ? ` · ${titulo}` : ""}
        </span>
      </div>

      {/* pergunta */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <h2 className="font-display text-2xl leading-snug font-bold tracking-tight">
            {q.question}
          </h2>
          {audio && ttsDisponivel() && (
            <button
              type="button"
              onClick={() => speakJa(audio)}
              aria-label="Ouvir em japonês"
              className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 text-primary transition-colors hover:bg-primary/10"
            >
              <Volume2 className="h-5 w-5" />
            </button>
          )}
        </div>
        {q.sub && !checked && <p className="text-sm text-muted-foreground">{q.sub}</p>}
      </div>

      {/* alternativas */}
      <div className="grid gap-3 sm:grid-cols-2">
        {q.options.map((opt, i) => {
          const isSel = i === selected;
          const isAns = i === q.answer;
          return (
            <button
              key={`${opt}-${i}`}
              type="button"
              disabled={checked}
              onClick={() => setSelected(i)}
              className={cn(
                "rounded-2xl border-2 border-b-4 p-4 text-left font-medium transition-all",
                checked && isAns && "border-primary bg-primary/10 text-foreground",
                checked && isSel && !isAns && "border-destructive bg-destructive/10",
                !checked && isSel && "border-primary bg-primary/10",
                !checked && !isSel && "border-border bg-card hover:bg-accent",
                checked && !isAns && !isSel && "opacity-60",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* barra de feedback */}
      <div
        className={cn(
          "rounded-2xl border-2 p-5 transition-colors",
          !checked && "border-transparent",
          checked && correto && "border-primary/40 bg-primary/10",
          checked && !correto && "border-destructive/40 bg-destructive/10",
        )}
      >
        {checked ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div
                className={cn(
                  "flex items-center gap-2 font-display text-lg font-bold",
                  correto ? "text-primary" : "text-destructive",
                )}
              >
                {correto ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                {correto ? "Muito bem!" : "Resposta certa:"}
              </div>
              {!correto && <p className="mt-1 font-medium">{q.options[q.answer]}</p>}
              {q.sub && <p className="mt-1 text-sm text-muted-foreground">{q.sub}</p>}
            </div>
            <Button size="lg" onClick={continuar}>
              {vidas === 0 ? "Ver resultado" : index + 1 >= total ? "Finalizar" : "Continuar"}
            </Button>
          </div>
        ) : (
          <div className="flex justify-end">
            <Button size="lg" disabled={selected === null} onClick={verificar}>
              Verificar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
