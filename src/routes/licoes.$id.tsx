import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/use-progress";
import { licaoPorId, licoes } from "@/data/japanese";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/licoes/$id")({
  loader: ({ params }) => {
    const found = licaoPorId(params.id);
    if (!found) throw notFound();
    return { title: found.title, description: found.description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Lição não encontrada — Nihongo Quest" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.title} — Nihongo Quest`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description.slice(0, 150) },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description.slice(0, 150) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: LicaoPage,
});

function LicaoPage() {
  const { id } = Route.useParams();
  const licao = licaoPorId(id)!;
  const { done, complete } = useProgress();
  const feito = done.includes(licao.id);

  const index = licoes.findIndex((l) => l.id === licao.id);
  const anterior = index > 0 ? licoes[index - 1] : undefined;
  const proxima = index < licoes.length - 1 ? licoes[index + 1] : undefined;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/licoes"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Todas as lições
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{licao.category}</Badge>
          <Badge variant="accent">{licao.level}</Badge>
          <span className="text-xs text-muted-foreground">{licao.duration}</span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">{licao.title}</h1>
      </div>

      {licao.content.kind === "kana" && (
        <Card>
          <CardHeader>
            <CardTitle>Caracteres desta lição</CardTitle>
            <CardDescription>Leia em voz alta e escreva cada um três vezes.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {licao.content.items.map((k) => (
              <div
                key={k.char}
                className="rounded-lg border border-border p-4 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <div className="font-display text-3xl font-bold">{k.char}</div>
                <div className="mt-1 text-sm text-primary">{k.romaji}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {licao.content.kind === "kanji" && (
        <Card>
          <CardHeader>
            <CardTitle>Kanji desta lição</CardTitle>
            <CardDescription>Significado e leituras on'yomi / kun'yomi.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {licao.content.items.map((k) => (
              <div key={k.char} className="rounded-lg border border-border p-4">
                <div className="font-display text-4xl font-bold">{k.char}</div>
                <div className="mt-1 font-medium text-foreground">{k.meaning}</div>
                <div className="text-sm text-muted-foreground">{k.readings.join(" · ")}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {licao.content.kind === "vocab" && (
        <Card>
          <CardHeader>
            <CardTitle>Vocabulário desta lição</CardTitle>
            <CardDescription>Palavras novas com leitura e tradução.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {licao.content.items.map((v) => (
              <div key={v.word} className="rounded-lg border border-border p-4">
                <div className="font-display text-2xl font-bold">{v.word}</div>
                <div className="text-sm font-medium text-primary">{v.reading}</div>
                <div className="mt-1 text-sm text-muted-foreground">{v.meaning}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {licao.content.kind === "gramatica" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Explicação</CardTitle>
              <CardDescription>{licao.content.point.explanation}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-secondary p-4 font-display text-lg font-semibold">
                {licao.content.point.pattern}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Exemplos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {licao.content.point.examples.map((ex, i) => (
                <div key={i} className="rounded-lg border border-border p-4">
                  <div className="font-display text-lg font-semibold">{ex.jp}</div>
                  <div className="text-sm text-primary">{ex.romaji}</div>
                  <div className="text-sm text-muted-foreground">{ex.pt}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </>
      )}

      <Card>
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {feito ? "Lição concluída. Bom trabalho!" : "Terminou de estudar esta lição?"}
          </div>
          <Button onClick={() => complete(licao.id)} disabled={feito}>
            <Check className="mr-2 h-4 w-4" />
            {feito ? "Concluída" : "Marcar como concluída"}
          </Button>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between gap-3">
        {anterior ? (
          <Link
            to="/licoes/$id"
            params={{ id: anterior.id }}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Link>
        ) : (
          <span />
        )}
        {proxima && (
          <Link to="/licoes/$id" params={{ id: proxima.id }} className={cn(buttonVariants())}>
            Próxima
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
