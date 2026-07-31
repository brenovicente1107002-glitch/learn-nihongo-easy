import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  katakana,
  katakanaDakuten,
  katakanaYouon,
  katakanaExtra,
  type KanaItem,
} from "@/data/japanese";

export const Route = createFileRoute("/katakana")({
  head: () => ({
    meta: [
      { title: "Katakana completo — Nihongo Quest" },
      {
        name: "description",
        content:
          "Todo o katakana: sons básicos, dakuten, youon e combinações para palavras estrangeiras.",
      },
      { property: "og:title", content: "Katakana completo — Nihongo Quest" },
      {
        property: "og:description",
        content: "Tabela completa de katakana com romaji, incluindo sons estrangeiros.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KatakanaPage,
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

function KatakanaPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Katakana</h1>
        <p className="mt-1 text-muted-foreground">
          Usado para palavras estrangeiras, onomatopeias e ênfase. Tabela completa abaixo.
        </p>
      </div>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Sons básicos</CardTitle>
            <CardDescription>46 caracteres fundamentais.</CardDescription>
          </CardHeader>
        </Card>
        <KanaGrid items={katakana} />
      </section>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Dakuten e handakuten</CardTitle>
            <CardDescription>ガ、ザ、ダ、バ e パ.</CardDescription>
          </CardHeader>
        </Card>
        <KanaGrid items={katakanaDakuten} />
      </section>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Youon (combinações)</CardTitle>
            <CardDescription>Combinações com ャ、ュ、ョ pequenos.</CardDescription>
          </CardHeader>
        </Card>
        <KanaGrid items={katakanaYouon} />
      </section>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Sons estrangeiros</CardTitle>
            <CardDescription>ファ、ヴィ、ティ e outras adaptações modernas.</CardDescription>
          </CardHeader>
        </Card>
        <KanaGrid items={katakanaExtra} />
      </section>
    </div>
  );
}
