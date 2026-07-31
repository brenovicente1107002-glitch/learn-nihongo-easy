import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LevelTabs } from "@/components/level-tabs";
import { flashcards, kanjiFlashcards, type JlptLevel } from "@/data/japanese";
import { ArrowLeft, ArrowRight, RotateCw } from "lucide-react";

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

function FlashcardsPage() {
  const [level, setLevel] = useState<JlptLevel>("N5");
  const [mode, setMode] = useState<"vocab" | "kanji">("vocab");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = useMemo(
    () => (mode === "vocab" ? flashcards : kanjiFlashcards).filter((c) => c.level === level),
    [mode, level],
  );

  const card = deck[index];
  const progress = deck.length ? Math.round(((index + 1) / deck.length) * 100) : 0;

  function reset(fn: () => void) {
    fn();
    setIndex(0);
    setFlipped(false);
  }

  function next() {
    setIndex((i) => (i + 1) % deck.length);
    setFlipped(false);
  }

  function prev() {
    setIndex((i) => (i - 1 + deck.length) % deck.length);
    setFlipped(false);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Flashcards</h1>
        <p className="mt-1 text-muted-foreground">Clique no cartão para ver a resposta.</p>
      </div>

      <LevelTabs value={level} onChange={(l) => reset(() => setLevel(l))} />

      <div className="flex gap-2">
        <Button
          variant={mode === "vocab" ? "default" : "outline"}
          onClick={() => reset(() => setMode("vocab"))}
        >
          Vocabulário
        </Button>
        <Button
          variant={mode === "kanji" ? "default" : "outline"}
          onClick={() => reset(() => setMode("kanji"))}
        >
          Kanji
        </Button>
      </div>

      {!card ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Nenhum cartão disponível para este nível.
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              Cartão {index + 1} de {deck.length}
            </CardTitle>
            <CardDescription>Memorize a leitura e o significado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={progress} />

            <button
              onClick={() => setFlipped((f) => !f)}
              className="relative w-full rounded-2xl border border-border bg-card p-12 text-center transition-all hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <div className="font-display text-4xl font-bold text-foreground sm:text-5xl">
                {flipped ? card.back : card.front}
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                {flipped ? "Verso" : "Frente"} — clique para virar
              </div>
            </button>

            <div className="flex items-center justify-between gap-3">
              <Button variant="outline" onClick={prev}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button variant="secondary" onClick={() => setFlipped((f) => !f)}>
                <RotateCw className="mr-2 h-4 w-4" />
                Virar
              </Button>
              <Button onClick={next}>
                Próximo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
