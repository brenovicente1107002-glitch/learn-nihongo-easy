import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LevelTabs } from "@/components/level-tabs";
import { vocabulario, jlptInfo, jlptLevels, type JlptLevel } from "@/data/japanese";

export const Route = createFileRoute("/vocabulario")({
  head: () => ({
    meta: [
      { title: "Vocabulário JLPT N5–N1 — Nihongo Quest" },
      {
        name: "description",
        content:
          "Vocabulário japonês de todos os níveis do JLPT, organizado por nível e classe gramatical.",
      },
      { property: "og:title", content: "Vocabulário JLPT N5–N1 — Nihongo Quest" },
      {
        property: "og:description",
        content: "Palavras japonesas do N5 ao N1 com leitura em romaji e tradução em português.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VocabularioPage,
});

function VocabularioPage() {
  const [level, setLevel] = useState<JlptLevel>("N5");
  const counts = Object.fromEntries(
    jlptLevels.map((l) => [l, vocabulario.filter((v) => v.level === l).length]),
  );
  const list = vocabulario.filter((v) => v.level === level);
  const categories = Array.from(new Set(list.map((v) => v.type)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Vocabulário</h1>
        <p className="mt-1 text-muted-foreground">
          Palavras essenciais de cada nível do JLPT, agrupadas por classe gramatical.
        </p>
      </div>

      <LevelTabs value={level} onChange={setLevel} counts={counts} />

      <Card>
        <CardHeader>
          <CardTitle>{jlptInfo[level].title}</CardTitle>
          <CardDescription>{jlptInfo[level].description}</CardDescription>
        </CardHeader>
      </Card>

      {categories.map((category) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="font-display capitalize">{category}s</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list
                .filter((v) => v.type === category)
                .map((v, i) => (
                  <div
                    key={i}
                    className="flex flex-col rounded-lg border border-border p-4 transition-colors hover:border-primary/30 hover:bg-primary/5"
                  >
                    <span className="font-display text-2xl font-bold text-foreground">
                      {v.word}
                    </span>
                    <span className="text-sm font-medium text-primary">{v.reading}</span>
                    <span className="mt-1 text-sm text-muted-foreground">{v.meaning}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
