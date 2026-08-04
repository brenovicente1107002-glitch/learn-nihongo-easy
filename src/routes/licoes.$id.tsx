import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/use-progress";
import { useSrs } from "@/hooks/use-srs";
import { LessonPlayer } from "@/components/lesson-player";
import { formatDue, lessonQuestions } from "@/lib/srs";
import { frase } from "@/lib/sentences";
import { speakJa, ttsDisponivel } from "@/lib/tts";
import { licaoPorId, licoes } from "@/data/japanese";
import { ArrowLeft, ArrowRight, CalendarClock, Play, Volume2 } from "lucide-react";

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

function AudioButton({ text, label }: { text: string; label?: string }) {
  if (!ttsDisponivel()) return null;
  return (
    <button
      type="button"
      onClick={() => speakJa(text)}
      aria-label={label ?? `Ouvir ${text}`}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
    >
      <Volume2 className="h-4 w-4" />
    </button>
  );
}

function LicaoPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const licao = licaoPorId(id)!;
  const { done, complete } = useProgress();
  const { review, getCard } = useSrs();
  const card = getCard(licao.id);
  const feito = done.includes(licao.id);

  const questions = useMemo(() => lessonQuestions(licao), [licao]);
  const [playing, setPlaying] = useState(false);
  const [resultado, setResultado] = useState<{ accuracy: number; due: number } | null>(null);

  const index = licoes.findIndex((l) => l.id === licao.id);
  const anterior = index > 0 ? licoes[index - 1] : undefined;
  const proxima = index < licoes.length - 1 ? licoes[index + 1] : undefined;

  if (playing) {
    return (
      <div className="mx-auto max-w-2xl">
        <LessonPlayer
          questions={questions}
          titulo={licao.title}
          onExit={() => setPlaying(false)}
          onFinish={(accuracy) => {
            complete(licao.id);
            const updated = review(licao.id, accuracy);
            setResultado({ accuracy, due: updated.due });
            setPlaying(false);
          }}
        />
      </div>
    );
  }

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

      {resultado && (
        <Card className="border-primary/40 bg-primary/5">
          <CardHeader>
            <CardTitle>{Math.round(resultado.accuracy * 100)}% de acerto</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              Próxima revisão desta lição: {formatDue(resultado.due)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button onClick={() => setPlaying(true)}>Refazer</Button>
            {proxima && (
              <Button
                variant="outline"
                onClick={() => {
                  setResultado(null);
                  void navigate({ to: "/licoes/$id", params: { id: proxima.id } });
                }}
              >
                Próxima lição
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {questions.length} exercícios com áudio nativo
            {card ? ` · próxima revisão ${formatDue(card.due)}` : ""}
          </div>
          <Button size="lg" onClick={() => setPlaying(true)}>
            <Play className="mr-2 h-4 w-4" />
            {feito ? "Refazer lição" : "Começar lição"}
          </Button>
        </CardContent>
      </Card>

      {licao.content.kind === "kana" && (
        <Card>
          <CardHeader>
            <CardTitle>Caracteres desta lição</CardTitle>
            <CardDescription>Toque para ouvir a pronúncia nativa.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3 sm:grid-cols-5">
            {licao.content.items.map((k) => (
              <button
                key={k.char}
                type="button"
                onClick={() => speakJa(k.char)}
                className="rounded-xl border border-border p-4 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
              >
                <div className="font-display text-3xl font-bold">{k.char}</div>
                <div className="mt-1 text-sm text-primary">{k.romaji}</div>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      {licao.content.kind === "mista" && (
        <>
          {licao.content.vocab.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Vocabulário em frases</CardTitle>
                <CardDescription>Cada palavra aparece dentro de uma sentença real.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {licao.content.vocab.map((v) => {
                  const f = frase(v);
                  return (
                    <div key={v.word} className="rounded-xl border border-border p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-display text-xl font-bold">{v.word}</span>
                        <span className="text-sm text-primary">{v.reading}</span>
                        <AudioButton text={v.word} />
                      </div>
                      <div className="text-sm text-muted-foreground">{v.meaning}</div>
                      <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                        <span className="font-display text-lg">{f.jp}</span>
                        <AudioButton text={f.jp} />
                      </div>
                      <div className="text-sm text-muted-foreground">{f.pt}</div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {licao.content.kanji.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Kanji desta lição</CardTitle>
                <CardDescription>Significado e leituras on'yomi / kun'yomi.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {licao.content.kanji.map((k) => (
                  <div key={k.char} className="rounded-xl border border-border p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-4xl font-bold">{k.char}</span>
                      <AudioButton text={k.char} />
                    </div>
                    <div className="mt-1 font-medium text-foreground">{k.meaning}</div>
                    <div className="text-sm text-muted-foreground">{k.readings.join(" · ")}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {licao.content.points.map((point) => (
            <Card key={point.title}>
              <CardHeader>
                <CardTitle>Gramática: {point.title}</CardTitle>
                <CardDescription>{point.explanation}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-xl bg-secondary p-4 font-display text-lg font-semibold">
                  {point.pattern}
                </div>
                {point.examples.map((ex, i) => (
                  <div key={i} className="rounded-xl border border-border p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-lg font-semibold">{ex.jp}</span>
                      <AudioButton text={ex.jp} />
                    </div>
                    <div className="text-sm text-primary">{ex.romaji}</div>
                    <div className="text-sm text-muted-foreground">{ex.pt}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </>
      )}

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
