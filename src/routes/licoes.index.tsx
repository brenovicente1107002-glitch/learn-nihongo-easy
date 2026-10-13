import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { AomaruAvatar } from "@/components/mascot";
import { TrailNode } from "@/components/trail-node";
import { agruparLicoes } from "@/lib/trail";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/use-progress";
import {
  jlptInfo,
  licoes,
  niveisDeLicao,
  unidadesPorNivel,
  type LicaoNivel,
} from "@/data/japanese";
import { Crown, Flower2, Sparkles, Star } from "lucide-react";

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

  const currentId = doNivel[atualIndex]?.id;
  const todasUnidades = useMemo(() => unidadesPorNivel(level), [level]);

  /** mostra as unidades aos poucos: a trilha completa tem centenas delas */
  const [visiveis, setVisiveis] = useState(6);
  const unidades = useMemo(
    () => todasUnidades.slice(0, visiveis),
    [todasUnidades, visiveis],
  );

  const concluidasNivel = doNivel.filter((l) => feitas.has(l.id)).length;
  const progressoNivel = Math.round((concluidasNivel / Math.max(doNivel.length, 1)) * 100);

  return (
    <div className="mx-auto max-w-2xl space-y-4 sm:space-y-6">
      <div className="relative overflow-hidden border-b border-border pb-4 pr-20">
        <AomaruAvatar expressao="feliz" className="float absolute right-0 bottom-3 h-20 w-20" />
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Trilha de aprendizado</h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          {licoes.length.toLocaleString("pt-BR")} lições · Kana ao N1
        </p>
      </div>

      {/* seletor de nível */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {niveisDeLicao.map((n) => (
          <Button
            key={n}
            variant="outline"
            type="button"
            onClick={() => {
              setLevel(n);
              setVisiveis(6);
            }}
            className={cn(
              "shrink-0 rounded-full border-2 border-b-4 px-4 py-2 font-display text-sm font-bold transition-colors",
              "h-auto",
              level === n
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {n}
            <span className="ml-2 text-xs opacity-70">
              {licoes.filter((l) => l.level === n).length}
            </span>
          </Button>
        ))}
      </div>

      <div className="space-y-3 border-b border-border pb-5">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="font-display text-sm font-semibold">{level === "Kana" ? "Escrita — hiragana e katakana" : jlptInfo[level].title}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{concluidasNivel} de {doNivel.length} lições concluídas</p>
          </div>
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-trail-mint/30 bg-trail-mint/10 text-xs font-bold text-trail-mint">{progressoNivel}%</span>
        </div>
        <Progress value={progressoNivel} />
      </div>

      {/* trilha por unidades temáticas */}
      <div className="space-y-8 sm:space-y-12">
        {unidades.map((unidade) => {
          const groups = agruparLicoes(unidade.licoes);
          const unidadeFeita = unidade.licoes.every((l) => feitas.has(l.id));
          return (
            <section key={unidade.id} className="trail-unit relative space-y-4 sm:space-y-6">
              <div
                className={cn(
                  "unit-banner flex items-center justify-between rounded-lg border-2 border-b-4 px-3 py-3 sm:px-4",
                  unidadeFeita ? "border-trail-mint/40 bg-trail-mint/10" : "border-primary/25 bg-primary/5",
                )}
              >
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <span className="text-xl sm:text-2xl">{unidade.emoji}</span>
                  <div className="min-w-0">
                    <div className="truncate font-display text-xs font-bold sm:text-sm">
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

              <div className="relative isolate">
                <div className="flex flex-col items-center gap-7 py-8 sm:gap-10">
                   {groups.map((group, i) => <TrailNode key={group[0]?.id ?? i} lessons={group} position={i} done={feitas} currentId={currentId} />)}
                </div>
              </div>
            </section>
          );
        })}

        {visiveis < todasUnidades.length && (
          <Button
            variant="outline"
            type="button"
            onClick={() => setVisiveis((v) => v + 6)}
            className="w-full rounded-2xl border-2 border-b-4 border-border bg-card py-3 font-display text-sm font-bold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
          >
            Ver mais unidades ({todasUnidades.length - visiveis} restantes)
          </Button>
        )}
      </div>
    </div>
  );
}
