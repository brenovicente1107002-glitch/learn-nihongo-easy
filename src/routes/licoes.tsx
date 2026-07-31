import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { licoes, jlptInfo, jlptLevels, type Licao } from "@/data/japanese";
import { Check, Lock, Play } from "lucide-react";

export const Route = createFileRoute("/licoes")({
  head: () => ({
    meta: [
      { title: "Lições JLPT N5–N1 — Nihongo Quest" },
      {
        name: "description",
        content: "Caminho completo de lições de japonês, do kana ao JLPT N1.",
      },
      { property: "og:title", content: "Lições JLPT N5–N1 — Nihongo Quest" },
      {
        property: "og:description",
        content: "Trilha de aprendizado de japonês cobrindo kana, kanji, vocabulário e gramática.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LicoesPage,
});

function LicaoCard({ l, i }: { l: Licao; i: number }) {
  return (
    <Card className={l.locked ? "opacity-70" : undefined}>
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ${
              l.completed
                ? "bg-primary text-primary-foreground"
                : l.locked
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary/10 text-primary"
            }`}
          >
            {l.completed ? <Check className="h-6 w-6" /> : i + 1}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-base">{l.title}</CardTitle>
              <Badge variant="outline">{l.category}</Badge>
            </div>
            <CardDescription className="mt-1">{l.description}</CardDescription>
            <div className="mt-2 text-xs text-muted-foreground">Duração: {l.duration}</div>
          </div>
        </div>
        <div className="shrink-0">
          {l.locked ? (
            <Button variant="outline" disabled>
              <Lock className="mr-2 h-4 w-4" />
              Bloqueada
            </Button>
          ) : l.completed ? (
            <Button variant="secondary">Revisar</Button>
          ) : (
            <Button>
              <Play className="mr-2 h-4 w-4" />
              Iniciar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function LicoesPage() {
  const completed = licoes.filter((l) => l.completed).length;
  const progress = Math.round((completed / licoes.length) * 100);
  const kana = licoes.filter((l) => l.level === "Kana");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Lições</h1>
        <p className="mt-1 text-muted-foreground">
          Trilha completa: do kana ao JLPT N1, passo a passo.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progresso do curso</CardTitle>
          <CardDescription>
            {completed} de {licoes.length} lições concluídas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} />
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold">Fundamentos — Kana</h2>
        {kana.map((l, i) => (
          <LicaoCard key={l.id} l={l} i={i} />
        ))}
      </section>

      {jlptLevels.map((level) => (
        <section key={level} className="space-y-4">
          <div>
            <h2 className="font-display text-xl font-bold">{jlptInfo[level].title}</h2>
            <p className="text-sm text-muted-foreground">{jlptInfo[level].description}</p>
          </div>
          {licoes
            .filter((l) => l.level === level)
            .map((l, i) => (
              <LicaoCard key={l.id} l={l} i={i} />
            ))}
        </section>
      ))}
    </div>
  );
}
