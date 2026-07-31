import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { hiragana, hiraganaDakuten, hiraganaYouon, type KanaItem } from "@/data/japanese";

export const Route = createFileRoute("/hiragana")({
  head: () => ({
    meta: [
      { title: "Hiragana completo — Nihongo Quest" },
      {
        name: "description",
        content: "Todo o hiragana: 46 sons básicos, dakuten, handakuten e combinações youon.",
      },
      { property: "og:title", content: "Hiragana completo — Nihongo Quest" },
      {
        property: "og:description",
        content: "Tabela completa de hiragana com romaji: básico, dakuten e youon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HiraganaPage,
});

function KanaGrid({ items }: { items: KanaItem[] }) {
  const columns = Array.from(new Set(items.map((i) => i.column)));
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {columns.map((col) => (
        <Card key={col}>
          <CardHeader>
            <CardTitle className="font-display text-sm uppercase tracking-wider text-muted-foreground">
              Coluna {col}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {items
                .filter((i) => i.column === col)
                .map((h) => (
                  <div
                    key={h.char + h.romaji}
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
      ))}
    </div>
  );
}

function HiraganaPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Hiragana</h1>
        <p className="mt-1 text-muted-foreground">
          Alfabeto silábico usado para palavras nativas e gramática. Aqui está a tabela completa.
        </p>
      </div>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Sons básicos (gojūon)</CardTitle>
            <CardDescription>46 caracteres fundamentais.</CardDescription>
          </CardHeader>
        </Card>
        <KanaGrid items={hiragana} />
      </section>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Dakuten e handakuten</CardTitle>
            <CardDescription>Sons sonorizados: が、ざ、だ、ば e ぱ.</CardDescription>
          </CardHeader>
        </Card>
        <KanaGrid items={hiraganaDakuten} />
      </section>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Youon (combinações)</CardTitle>
            <CardDescription>Sílabas combinadas com や、ゆ、よ pequenos.</CardDescription>
          </CardHeader>
        </Card>
        <KanaGrid items={hiraganaYouon} />
      </section>
    </div>
  );
}
