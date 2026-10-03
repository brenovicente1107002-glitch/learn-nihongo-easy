import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LevelTabs } from "@/components/level-tabs";
import { flashcards, kanjiFlashcards, type JlptLevel } from "@/data/japanese";
import { speakJa } from "@/lib/tts";
import { cn } from "@/lib/utils";
import { RotateCcw, Shuffle, Volume2 } from "lucide-react";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards JLPT N5–N1 — Nihongo Quest" },
      {
        name: "description",
        content: "Revise vocabulário e kanji de todos os níveis do JLPT com flashcards.",
      },
      { property: "og:title", content: "Flashcards JLPT N5–N1 — Nihongo Quest" },
      {
        property: "og:description",
        content: "Cartões interativos de vocabulário e kanji, filtrados por nível do JLPT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FlashcardsPage,
});

type Card = { front: string; back: string; level: JlptLevel };
const TAMANHO = 20;

const embaralhar = <T,>(arr: T[]) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
};

function FlashcardsPage() {
  const [level, setLevel] = useState<JlptLevel>("N5");
  const [mode, setMode] = useState<"vocab" | "kanji">("vocab");
  const [seed, setSeed] = useState(0);
  const [fila, setFila] = useState<Card[] | null>(null);
  const [flipped, setFlipped] = useState(false);
  const [stats, setStats] = useState({ sabia: 0, quase: 0, nao: 0 });

  const base = useMemo(
    () => (mode === "vocab" ? flashcards : kanjiFlashcards).filter((c) => c.level === level),
    [mode, level],
  );
  const deck = useMemo(() => {
    void seed;
    return embaralhar(base).slice(0, TAMANHO) as Card[];
  }, [base, seed]);

  const atual = fila ?? deck;
  const card = atual[0];
  const feitos = stats.sabia + stats.quase + stats.nao;
  const total = feitos + atual.length;

  function novaSessao() {
    setFila(null);
    setFlipped(false);
    setStats({ sabia: 0, quase: 0, nao: 0 });
    setSeed((s) => s + 1);
  }

  function responder(r: "sabia" | "quase" | "nao") {
    if (!card) return;
    const resto = atual.slice(1);
    // não sabia → volta logo; quase → volta no fim; sabia → sai
    const proxima =
      r === "nao" ? [...resto.slice(0, 2), card, ...resto.slice(2)] : r === "quase" ? [...resto, card] : resto;
    setFila(proxima);
    setStats((s) => ({ ...s, [r]: s[r] + 1 }));
    setFlipped(false);
  }

  const [leitura, significado] = card ? card.back.split(" — ") : ["", ""];

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Flashcards</h1>
        <p className="mt-1 text-muted-foreground">Toque no cartão, depois diga o quanto você lembrou.</p>
      </div>

      <LevelTabs value={level} onChange={(l) => { setLevel(l); novaSessao(); }} />

      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1">
        {(["vocab", "kanji"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); novaSessao(); }}
            className={cn(
              "rounded-xl py-2 text-sm font-semibold transition-colors",
              mode === m ? "bg-card text-primary shadow-sm" : "text-muted-foreground",
            )}
          >
            {m === "vocab" ? "Vocabulário" : "Kanji"}
          </button>
        ))}
      </div>

      {!card ? (
        <div className="space-y-4 rounded-3xl border-2 border-border bg-card p-8 text-center">
          <div className="text-5xl">🎉</div>
          <h2 className="font-display text-2xl font-bold">Sessão concluída!</h2>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700"><b className="block text-xl">{stats.sabia}</b>Sabia</div>
            <div className="rounded-xl bg-amber-100 p-3 text-amber-700"><b className="block text-xl">{stats.quase}</b>Quase</div>
            <div className="rounded-xl bg-destructive/10 p-3 text-destructive"><b className="block text-xl">{stats.nao}</b>Não sabia</div>
          </div>
          <Button size="lg" className="w-full" onClick={novaSessao}>
            <RotateCcw className="mr-2 h-4 w-4" /> Nova sessão
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Progress value={total ? (feitos / total) * 100 : 0} className="h-3" />
            <span className="shrink-0 text-xs font-semibold text-muted-foreground">
              {atual.length} restantes
            </span>
            <button onClick={novaSessao} aria-label="Embaralhar" className="text-muted-foreground hover:text-primary">
              <Shuffle className="h-4 w-4" />
            </button>
          </div>

          <div className="[perspective:1200px]">
            <button
              onClick={() => setFlipped((f) => !f)}
              className={cn(
                "relative h-72 w-full transition-transform duration-500 [transform-style:preserve-3d]",
                flipped && "[transform:rotateY(180deg)]",
              )}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border-2 border-b-[6px] border-border bg-card [backface-visibility:hidden]">
                <span className="font-display text-6xl font-bold">{card.front}</span>
                <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Toque para virar
                </span>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-b-[6px] border-primary/50 bg-primary/5 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <span className="font-display text-3xl font-bold">{card.front}</span>
                <span className="text-lg font-semibold text-primary">{leitura}</span>
                <span className="text-center text-base text-muted-foreground">{significado}</span>
              </div>
            </button>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={() => void speakJa(card.front)}>
              <Volume2 className="mr-2 h-4 w-4" /> Ouvir
            </Button>
          </div>

          {flipped ? (
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => responder("nao")} className="rounded-2xl border-2 border-b-4 border-destructive/40 bg-destructive/10 py-3 text-sm font-bold text-destructive">Não sabia</button>
              <button onClick={() => responder("quase")} className="rounded-2xl border-2 border-b-4 border-amber-300 bg-amber-100 py-3 text-sm font-bold text-amber-700">Quase</button>
              <button onClick={() => responder("sabia")} className="rounded-2xl border-2 border-b-4 border-emerald-300 bg-emerald-100 py-3 text-sm font-bold text-emerald-700">Sabia!</button>
            </div>
          ) : (
            <Button size="lg" className="w-full" onClick={() => setFlipped(true)}>Mostrar resposta</Button>
          )}
        </>
      )}
    </div>
  );
}
