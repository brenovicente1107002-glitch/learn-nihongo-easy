import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { flashcards } from "@/data/japanese";
import { ArrowLeft, ArrowRight, RotateCw } from "lucide-react";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards — Nihongo Quest" },
      { name: "description", content: "Revise vocabulário japonês com flashcards interativos." },
      { property: "og:title", content: "Flashcards — Nihongo Quest" },
      {
        property: "og:description",
        content: "Revise vocabulário japonês com flashcards interativos.",
      },
    ],
  }),
  component: FlashcardsPage,
});

function FlashcardsPage() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = flashcards[index];
  const progress = Math.round(((index + 1) / flashcards.length) * 100);

  if (!card) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-muted-foreground">Nenhum flashcard disponível.</p>
      </div>
    );
  }

  function next() {
    setIndex((i) => (i + 1) % flashcards.length);
    setFlipped(false);
  }

  function prev() {
    setIndex((i) => (i - 1 + flashcards.length) % flashcards.length);
    setFlipped(false);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Flashcards</h1>
        <p className="mt-1 text-muted-foreground">Clique no cartão para ver a resposta.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Cartão {index + 1} de {flashcards.length}
          </CardTitle>
          <CardDescription>Memorize a leitura e o significado.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={progress} />

          <button
            onClick={() => setFlipped((f) => !f)}
            className="relative w-full rounded-2xl border border-border bg-card p-12 text-center transition-all hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <div className="font-display text-5xl font-bold text-foreground sm:text-6xl">
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
    </div>
  );
}
