import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/use-progress";
import {
  jlptInfo,
  licoes,
  niveisDeLicao,
  unidadesPorNivel,
  type LicaoNivel,
  type Licao,
} from "@/data/japanese";
import { Check, Crown, Lock, Star } from "lucide-react";

export const Route = createFileRoute("/licoes/")({
  head: () => ({
    meta: [
      { title: "Trilha de lições de japonês N5–N1 — Nihongo Quest" },
      {
        name: "description",
        content:
          "Siga a trilha de micro-lições de japonês: kana, kanji, vocabulário em frases e gramática com áudio nativo.",
      },
      { property: "og:title", content: "Trilha de lições de japonês N5–N1 — Nihongo Quest" },
      {
        property: "og:description",
        content: "Trilha passo a passo: kana, kanji, vocabulário e gramática em um só lugar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LicoesPage,
});

/** deslocamento horizontal de cada nó, formando o zigue-zague da trilha */
const OFFSETS = [0, 56, 84, 56, 0, -56, -84, -56];

function No({
  licao,
  posicao,
  estado,
}: {
  licao: Licao;
  posicao: number;
  estado: "feito" | "atual" | "bloqueado";
}) {
  const offset = OFFSETS[posicao % OFFSETS.length] ?? 0;
  const bloqueado = estado === "bloqueado";

  const conteudo = (
    <span
      className={cn(
        "relative flex h-[68px] w-[68px] items-center justify-center rounded-full border-b-[6px] transition-transform",
        estado === "feito" && "border-primary/60 bg-primary text-primary-foreground",
        estado === "atual" &&
          "animate-pulse border-primary/60 bg-primary text-primary-foreground shadow-lg shadow-primary/30",
        bloqueado && "border-border bg-secondary text-muted-foreground",
        !bloqueado && "hover:-translate-y-0.5 active:translate-y-0.5 active:border-b-2",
      )}
    >
      {estado === "feito" ? (
        <Check className="h-7 w-7" />
      ) : bloqueado ? (
        <Lock className="h-6 w-6" />
      ) : (
        <Star className="h-7 w-7 fill-current" />
      )}
    </span>
  );

  return (
    <div
      className="flex flex-col items-center gap-1"
      style={{ transform: `translateX(${offset}px)` }}
    >
      {bloqueado ? (
        <span aria-disabled className="cursor-not-allowed opacity-70">
          {conteudo}
        </span>
      ) : (
        <Link to="/licoes/$id" params={{ id: licao.id }} aria-label={licao.title}>
          {conteudo}
        </Link>
      )}
      <span
        className={cn(
          "max-w-[140px] truncate text-center text-[11px] font-medium",
          bloqueado ? "text-muted-foreground/70" : "text-muted-foreground",
        )}
      >
        {licao.title.replace(/^.*— /, "")}
      </span>
    </div>
  );
}

function LicoesPage() {
  const [level, setLevel] = useState<LicaoNivel>("Kana");
  const { done } = useProgress();

  const doNivel = useMemo(() => licoes.filter((l) => l.level === level), [level]);
  const feitas = useMemo(() => new Set(done), [done]);

  /** primeira lição não concluída do nível = lição atual; as seguintes ficam bloqueadas */
  const atualIndex = useMemo(() => {
    const i = doNivel.findIndex((l) => !feitas.has(l.id));
    return i === -1 ? doNivel.length : i;
  }, [doNivel, feitas]);

  const unidades = useMemo(() => unidadesPorNivel(level), [level]);

  const concluidasNivel = doNivel.filter((l) => feitas.has(l.id)).length;
  const progressoNivel = Math.round((concluidasNivel / Math.max(doNivel.length, 1)) * 100);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Trilha de aprendizado</h1>
        <p className="mt-1 text-muted-foreground">
          {licoes.length} micro-lições com 15 exercícios cada — vocabulário em frases, kanji e
          gramática juntos, com áudio nativo.
        </p>
      </div>

      {/* seletor de nível */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {niveisDeLicao.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setLevel(n)}
            className={cn(
              "shrink-0 rounded-full border-2 border-b-4 px-4 py-2 font-display text-sm font-bold transition-colors",
              level === n
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {n}
            <span className="ml-2 text-xs opacity-70">
              {licoes.filter((l) => l.level === n).length}
            </span>
          </button>
        ))}
      </div>

      <Card className="border-primary/30 bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {level === "Kana" ? "Escrita — hiragana e katakana" : jlptInfo[level].title}
          </CardTitle>
          <CardDescription>
            {level === "Kana"
              ? "Aprenda a ler e ouvir todos os caracteres antes de avançar."
              : jlptInfo[level].description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Progress value={progressoNivel} />
          <div className="text-xs text-muted-foreground">
            {concluidasNivel} de {doNivel.length} lições concluídas neste nível
          </div>
        </CardContent>
      </Card>

      {/* trilha por unidades temáticas */}
      <div className="space-y-12">
        {unidades.map((unidade) => {
          const unidadeFeita = unidade.licoes.every((l) => feitas.has(l.id));
          return (
            <section key={unidade.id} className="space-y-6">
              <div
                className={cn(
                  "flex items-center justify-between rounded-2xl border-2 border-b-4 px-4 py-3",
                  unidadeFeita ? "border-primary/40 bg-primary/10" : "border-border bg-card",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{unidade.emoji}</span>
                  <div>
                    <div className="font-display text-sm font-bold">
                      Unidade {unidade.numero} · {unidade.titulo}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {unidade.capitulos.length} capítulos · {unidade.licoes.length} lições
                    </div>
                  </div>
                </div>
                <Crown
                  className={cn(
                    "h-5 w-5",
                    unidadeFeita ? "text-primary" : "text-muted-foreground/40",
                  )}
                />
              </div>

              {unidade.capitulos.map((cap) => (
                <div key={`${unidade.id}-c${cap.numero}`} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-border" />
                    <span className="font-display text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                      Capítulo {cap.numero} · {cap.titulo}
                    </span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <div className="flex flex-col items-center gap-6 overflow-hidden py-1">
                    {cap.licoes.map((l) => {
                      const idx = doNivel.indexOf(l);
                      const estado = feitas.has(l.id)
                        ? "feito"
                        : idx <= atualIndex
                          ? "atual"
                          : "bloqueado";
                      return <No key={l.id} licao={l} posicao={idx} estado={estado} />;
                    })}
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}
