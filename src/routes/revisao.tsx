import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { LevelTabs } from "@/components/level-tabs";
import { LessonPlayer } from "@/components/lesson-player";
import { licaoPorId, licoes, type JlptLevel } from "@/data/japanese";
import { useSrs } from "@/hooks/use-srs";
import {
  filtrarPorModo,
  formatDue,
  lessonQuestions,
  modosRevisao,
  type ExercicioKind,
  type QuizQuestion,
} from "@/lib/srs";

import { cn } from "@/lib/utils";
import { CalendarClock, Flame, Zap } from "lucide-react";

export const Route = createFileRoute("/revisao")({
  head: () => ({
    meta: [
      { title: "Revisão espaçada de japonês — Nihongo Quest" },
      {
        name: "description",
        content:
          "Sessões rápidas de revisão com áudio nativo: kanji, vocabulário em frases e gramática no ritmo certo.",
      },
      { property: "og:title", content: "Revisão espaçada de japonês — Nihongo Quest" },
      {
        property: "og:description",
        content: "Revise as lições no momento exato em que você está prestes a esquecer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RevisaoPage,
});

const SESSAO = 15;

function RevisaoPage() {
  const { dueIds, cards, scheduledCount, review } = useSrs();
  const [level, setLevel] = useState<JlptLevel>("N5");
  const [modo, setModo] = useState<ExercicioKind | "misto">("misto");
  const [sessao, setSessao] = useState<{ ids: string[]; questions: QuizQuestion[] } | null>(null);
  const [resultado, setResultado] = useState<number | null>(null);

  const proximas = useMemo(() => Object.values(cards).sort((a, b) => a.due - b.due), [cards]);

  /** Revisão inteligente: primeiro o que está mais atrasado e com pior desempenho. */
  const prioridade = useMemo(() => {
    const agora = Date.now();
    return [...dueIds].sort((a, b) => {
      const ca = cards[a];
      const cb = cards[b];
      const pa = (agora - (ca?.due ?? agora)) / 3600000 + (100 - (ca?.lastScore ?? 0));
      const pb = (agora - (cb?.due ?? agora)) / 3600000 + (100 - (cb?.lastScore ?? 0));
      return pb - pa;
    });
  }, [dueIds, cards]);

  const iniciar = (ids: string[]) => {
    const usados: string[] = [];
    const questions: QuizQuestion[] = [];
    for (const id of ids) {
      const l = licaoPorId(id);
      if (!l) continue;
      const qs = filtrarPorModo(lessonQuestions(l), modo).slice(0, 5);
      if (!qs.length) continue;
      usados.push(id);
      questions.push(...qs);
      if (questions.length >= SESSAO) break;
    }
    if (!questions.length) return;
    setResultado(null);
    setSessao({ ids: usados, questions: questions.slice(0, SESSAO) });
  };

  const treinoLivre = () => {
    const doNivel = licoes.filter((l) => l.level === level);
    const escolhidas = doNivel.slice(0, 4).map((l) => l.id);
    iniciar(escolhidas);
  };


  if (sessao) {
    return (
      <div className="mx-auto max-w-2xl">
        <LessonPlayer
          questions={sessao.questions}
          titulo="Revisão"
          onExit={() => setSessao(null)}
          onFinish={(accuracy) => {
            sessao.ids.forEach((id) => review(id, accuracy));
            setResultado(Math.round(accuracy * 100));
            setSessao(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Revisão</h1>
        <p className="mt-1 text-muted-foreground">
          Sessões curtas de 15 exercícios, no momento certo para não esquecer.
        </p>
      </div>

      {resultado !== null && (
        <Card className="border-primary/40 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-primary" />
              Sessão concluída — {resultado}% de acerto
            </CardTitle>
            <CardDescription>As lições revisadas já foram reagendadas.</CardDescription>
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            {dueIds.length > 0 ? `${dueIds.length} lição(ões) prontas` : "Nada vencido agora"}
          </CardTitle>
          <CardDescription>
            {scheduledCount === 0
              ? "Faça uma lição para que ela entre no agendamento automático."
              : `${scheduledCount} lições no seu calendário de revisão.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button size="lg" disabled={dueIds.length === 0} onClick={() => iniciar(dueIds)}>
            Revisar agora
          </Button>
          {dueIds.slice(0, 6).map((id) => {
            const l = licaoPorId(id);
            if (!l) return null;
            return (
              <div
                key={id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border p-3"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium">{l.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {l.category} · último resultado {cards[id]?.lastScore ?? 0}%
                  </div>
                </div>
                <Link
                  to="/licoes/$id"
                  params={{ id }}
                  className={cn(buttonVariants({ size: "sm", variant: "outline" }), "shrink-0")}
                >
                  Abrir lição
                </Link>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {proximas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              Próximas revisões
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {proximas.slice(0, 6).map((c) => (
              <div key={c.id} className="flex justify-between gap-3">
                <span className="truncate">{licaoPorId(c.id)?.title ?? c.id}</span>
                <span className="shrink-0 text-muted-foreground">{formatDue(c.due)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Treino livre</CardTitle>
          <CardDescription>Pratique qualquer nível, sem afetar muito o calendário.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LevelTabs value={level} onChange={setLevel} />
          <Button variant="outline" onClick={treinoLivre}>
            Treinar {level}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
