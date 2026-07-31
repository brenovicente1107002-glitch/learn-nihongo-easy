import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { gramatica } from "@/data/japanese";

export const Route = createFileRoute("/gramatica")({
  head: () => ({
    meta: [
      { title: "Gramática — Nihongo Quest" },
      { name: "description", content: "Regras gramaticais essenciais para formar frases corretas em japonês." },
      { property: "og:title", content: "Gramática — Nihongo Quest" },
      { property: "og:description", content: "Regras gramaticais essenciais para formar frases corretas em japonês." },
    ],
  }),
  component: GramaticaPage,
});

function GramaticaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Gramática</h1>
        <p className="mt-1 text-muted-foreground">Estruturas e partículas fundamentais para falar japonês.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {gramatica.map((g, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle>{g.title}</CardTitle>
              </div>
              <CardDescription>{g.explanation}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="accent" className="mb-2">Padrão</Badge>
                <div className="rounded-lg bg-secondary p-3 font-display text-lg font-semibold">{g.pattern}</div>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Exemplos</Badge>
                <div className="space-y-2">
                  {g.examples.map((ex, idx) => (
                    <div key={idx} className="rounded-lg border border-border p-3">
                      <div className="font-display text-lg font-semibold text-foreground">{ex.jp}</div>
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
