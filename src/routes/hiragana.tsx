import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hiragana } from "@/data/japanese";

export const Route = createFileRoute("/hiragana")({
  head: () => ({
    meta: [
      { title: "Hiragana — Nihongo Quest" },
      { name: "description", content: "Aprenda o alfabeto hiragana com áudio visual e romaji." },
      { property: "og:title", content: "Hiragana — Nihongo Quest" },
      {
        property: "og:description",
        content: "Aprenda o alfabeto hiragana com áudio visual e romaji.",
      },
    ],
  }),
  component: HiraganaPage,
});

function HiraganaPage() {
  const columns = ["a", "k", "s", "t", "n", "h", "m", "y", "r", "w", "n"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Hiragana</h1>
        <p className="mt-1 text-muted-foreground">
          Alfabeto silábico japonês usado para palavras nativas e gramática.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {columns.map((col) => {
          const chars = hiragana.filter((h) => h.column === col);
          if (chars.length === 0) return null;
          return (
            <Card key={col}>
              <CardHeader>
                <CardTitle className="font-display text-sm uppercase tracking-wider text-muted-foreground">
                  Coluna {col}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {chars.map((h) => (
                    <div
                      key={h.char}
                      className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-2 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <span className="font-display text-2xl font-bold text-foreground">
                        {h.char}
                      </span>
                      <span className="text-xs text-muted-foreground">{h.romaji}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dica de pronúncia</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Cada hiragana representa uma sílaba. As vogais são pronunciadas de forma uniforme: a
            (á), i (í), u (ú), e (ê), o (ó). A consoante ん não tem vogal própria e soa como um "n"
            nasal suave.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
