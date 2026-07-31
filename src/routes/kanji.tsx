import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LevelTabs } from "@/components/level-tabs";
import { kanji, jlptInfo, jlptLevels, type JlptLevel } from "@/data/japanese";

export const Route = createFileRoute("/kanji")({
  head: () => ({
    meta: [
      { title: "Kanji N5 a N1 — Nihongo Quest" },
      {
        name: "description",
        content:
          "Estude kanji de todos os níveis do JLPT (N5, N4, N3, N2 e N1) com significados e leituras.",
      },
      { property: "og:title", content: "Kanji N5 a N1 — Nihongo Quest" },
      {
        property: "og:description",
        content: "Kanji de todos os níveis do JLPT com significados, leituras on'yomi e kun'yomi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KanjiPage,
});

function KanjiPage() {
  const [level, setLevel] = useState<JlptLevel>("N5");
  const counts = Object.fromEntries(
    jlptLevels.map((l) => [l, kanji.filter((k) => k.level === l).length]),
  );
  const list = kanji.filter((k) => k.level === level);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Kanji</h1>
        <p className="mt-1 text-muted-foreground">
          Caracteres de origem chinesa, organizados por nível do JLPT — do N5 ao N1.
        </p>
      </div>

      <LevelTabs value={level} onChange={setLevel} counts={counts} />

      <Card>
        <CardHeader>
          <CardTitle>{jlptInfo[level].title}</CardTitle>
          <CardDescription>{jlptInfo[level].description}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((k) => (
          <Card key={k.char} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{k.level}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl font-bold text-foreground">{k.char}</span>
                <div>
                  <div className="font-display text-lg font-semibold text-primary">{k.meaning}</div>
                  <div className="text-sm text-muted-foreground">{k.readings.join(" · ")}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leituras on'yomi e kun'yomi</CardTitle>
          <CardDescription>Os kanji podem ter mais de uma leitura.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <strong className="text-foreground">On'yomi:</strong> leitura de origem chinesa, usada
              em compostos como 日本 (Nihon).
            </li>
            <li>
              <strong className="text-foreground">Kun'yomi:</strong> leitura japonesa nativa, usada
              sozinha ou com hiragana, como 山 (yama).
            </li>
            <li>
              <strong className="text-foreground">Dica:</strong> kanji sozinhos frequentemente usam
              kun'yomi; em palavras compostas, on'yomi é mais comum.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
