import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LevelTabs } from "@/components/level-tabs";
import { gramatica, jlptInfo, jlptLevels, type JlptLevel } from "@/data/japanese";

export const Route = createFileRoute("/gramatica")({
  head: () => ({
    meta: [
      { title: "Gramática JLPT N5–N1 — Nihongo Quest" },
      {
        name: "description",
        content:
          "Padrões gramaticais japoneses de todos os níveis do JLPT, com exemplos e tradução.",
      },
      { property: "og:title", content: "Gramática JLPT N5–N1 — Nihongo Quest" },
      {
        property: "og:description",
        content: "Partículas, conjugações e estruturas avançadas do japonês, do N5 ao N1.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GramaticaPage,
});

function GramaticaPage() {
  const [level, setLevel] = useState<JlptLevel>("N5");
  const counts = Object.fromEntries(
    jlptLevels.map((l) => [l, gramatica.filter((g) => g.level === l).length]),
  );
  const list = gramatica.filter((g) => g.level === level);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Gramática</h1>
        <p className="mt-1 text-muted-foreground">
          Estruturas fundamentais e avançadas, organizadas por nível do JLPT.
        </p>
      </div>

      <LevelTabs value={level} onChange={setLevel} counts={counts} />

      <Card>
        <CardHeader>
          <CardTitle>{jlptInfo[level].title}</CardTitle>
          <CardDescription>{jlptInfo[level].description}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {list.map((g, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>{g.title}</CardTitle>
                <Badge variant="outline">{g.level}</Badge>
              </div>
              <CardDescription>{g.explanation}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="accent" className="mb-2">
                  Padrão
                </Badge>
                <div className="rounded-lg bg-secondary p-3 font-display text-lg font-semibold">
                  {g.pattern}
                </div>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">
                  Exemplos
                </Badge>
                <div className="space-y-2">
                  {g.examples.map((ex, idx) => (
                    <div key={idx} className="rounded-lg border border-border p-3">
                      <div className="font-display text-lg font-semibold text-foreground">
                        {ex.jp}
                      </div>
                      <div className="text-sm text-primary">{ex.romaji}</div>
                      <div className="text-sm text-muted-foreground">{ex.pt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
