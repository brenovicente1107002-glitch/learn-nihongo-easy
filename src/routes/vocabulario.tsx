import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { vocabulario } from "@/data/japanese";

export const Route = createFileRoute("/vocabulario")({
  head: () => ({
    meta: [
      { title: "Vocabulário — Nihongo Quest" },
      {
        name: "description",
        content: "Expanda seu vocabulário japonês com palavras organizadas por categoria.",
      },
      { property: "og:title", content: "Vocabulário — Nihongo Quest" },
      {
        property: "og:description",
        content: "Expanda seu vocabulário japonês com palavras organizadas por categoria.",
      },
    ],
  }),
  component: VocabularioPage,
});

function VocabularioPage() {
  const categories = Array.from(new Set(vocabulario.map((v) => v.type)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Vocabulário</h1>
        <p className="mt-1 text-muted-foreground">
          Palavras essenciais para construir frases do dia a dia.
        </p>
      </div>

      {categories.map((category) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="font-display capitalize">{category}s</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {vocabulario
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
