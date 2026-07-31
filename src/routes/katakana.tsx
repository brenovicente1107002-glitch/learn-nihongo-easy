import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { katakana } from "@/data/japanese";

export const Route = createFileRoute("/katakana")({
  head: () => ({
    meta: [
      { title: "Katakana — Nihongo Quest" },
      { name: "description", content: "Aprenda o alfabeto katakana usado para palavras estrangeiras e empréstimos." },
      { property: "og:title", content: "Katakana — Nihongo Quest" },
      { property: "og:description", content: "Aprenda o alfabeto katakana usado para palavras estrangeiras e empréstimos." },
    ],
  }),
  component: KatakanaPage,
});

function KatakanaPage() {
  const columns = ["a", "k", "s", "t", "n", "h", "m", "y", "r", "w", "n"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Katakana</h1>
        <p className="mt-1 text-muted-foreground">Alfabeto silábico usado para palavras estrangeiras, nomes e onomatopeias.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {columns.map((col) => {
          const chars = katakana.filter((k) => k.column === col);
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
                  {chars.map((k) => (
                    <div
                      key={k.char}
                      className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-2 transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <span className="font-display text-2xl font-bold text-foreground">{k.char}</span>
                      <span className="text-xs text-muted-foreground">{k.romaji}</span>
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
          <CardTitle>Quando usar katakana?</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Palavras estrangeiras adaptadas: コーヒー (kōhii — café), バス (basu — ônibus).</li>
            <li>Nomes de animais e plantas em contextos científicos.</li>
            <li>Onomatopeias e sons: ドキドキ (dokidoki — coração acelerado).</li>
            <li>Ênfase ou títulos, similar ao itálico em português.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
