import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { kanji } from "@/data/japanese";

export const Route = createFileRoute("/kanji")({
  head: () => ({
    meta: [
      { title: "Kanji — Nihongo Quest" },
      { name: "description", content: "Estude kanji essenciais do nível N5 com significados e leituras." },
      { property: "og:title", content: "Kanji — Nihongo Quest" },
      { property: "og:description", content: "Estude kanji essenciais do nível N5 com significados e leituras." },
    ],
  }),
  component: KanjiPage,
});

function KanjiPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Kanji</h1>
        <p className="mt-1 text-muted-foreground">Caracteres de origem chinesa usados no japonês. Comece pelo nível N5.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {kanji.map((k) => (
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
              <strong className="text-foreground">On'yomi:</strong> leitura de origem chinesa, usada em compostos como 日本 (Nihon).
            </li>
            <li>
              <strong className="text-foreground">Kun'yomi:</strong> leitura japonesa nativa, usada sozinha ou com hiragana, como 山 (yama).
            </li>
            <li>
              <strong className="text-foreground">Dica:</strong> kanji sozinhos frequentemente usam kun'yomi; em palavras compostas, on'yomi é mais comum.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
