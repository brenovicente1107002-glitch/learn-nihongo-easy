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

const TAMANHOS = [15, 25, 40];

/** Embaralha ids para gerar revisões extras sempre diferentes. */
const shuffleIds = (ids: string[]): string[] => {
  const a = [...ids];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i]!;
    a[i] = a[j]!;
    a[j] = tmp;
  }
  return a;
};

function RevisaoPage() {
  const { dueIds, cards, scheduledCount, review } = useSrs();
  const [level, setLevel] = useState<JlptLevel>("N5");
  const [modo, setModo] = useState<ExercicioKind | "misto">("misto");
  const [sessao, setSessao] = useState<{ ids: string[]; questions: QuizQuestion[] } | null>(null);
  const [resultado, setResultado] = useState<number | null>(null);
  const [SESSAO, setSessaoTam] = useState(15);

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

  /** Monta sempre uma sessão de 15 exercícios, completando com lições vizinhas. */
  const iniciar = (ids: string[]) => {
    const usados: string[] = [];
    const questions: QuizQuestion[] = [];
    const vistas = new Set<string>();

    const puxar = (id: string, max: number) => {
      const l = licaoPorId(id);
      if (!l) return;
      const qs = filtrarPorModo(lessonQuestions(l), modo)
        .filter((q) => !vistas.has(q.question + q.target))
        .slice(0, max);
      if (!qs.length) return;
      qs.forEach((q) => vistas.add(q.question + q.target));
      if (!usados.includes(id)) usados.push(id);
      questions.push(...qs);
    };

    ids.forEach((id) => {
      if (questions.length < SESSAO) puxar(id, 5);
    });

    // completa até 15 com outras lições do mesmo nível das vencidas
    if (questions.length < SESSAO) {
      const extras = licoes.filter((l) => !ids.includes(l.id));
      for (const l of extras) {
        if (questions.length >= SESSAO) break;
        puxar(l.id, SESSAO - questions.length);
      }
    }

    if (!questions.length) return;
    setResultado(null);
    setSessao({ ids: usados, questions: questions.slice(0, SESSAO) });
  };

  const treinoLivre = () => {
    const doNivel = licoes.filter((l) => l.level === level);
    const escolhidas = doNivel.slice(0, 6).map((l) => l.id);
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
          Sessões no seu ritmo — escolha o tamanho e revise quantas vezes quiser.
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
          <CardTitle>Tipo de exercício</CardTitle>
          <CardDescription>
            {modosRevisao.find((m) => m.id === modo)?.desc ?? "Todos os tipos de exercício"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {modosRevisao.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setModo(m.id)}
              className={cn(
                "rounded-full border-2 border-b-4 px-4 py-2 font-display text-sm font-semibold transition-colors",
                modo === m.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {m.label}
            </button>
          ))}
          <div className="mt-2 flex w-full flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">Questões por sessão:</span>
            {TAMANHOS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSessaoTam(t)}
                className={cn(
                  "rounded-full border-2 border-b-4 px-3 py-1.5 font-display text-sm font-semibold transition-colors",
                  SESSAO === t
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            {dueIds.length > 0 ? `${dueIds.length} lição(ões) prontas` : "Nada vencido agora"}
          </CardTitle>
          <CardDescription>
            {scheduledCount === 0
              ? "Faça uma lição para que ela entre no agendamento automático."
              : `${scheduledCount} lições no seu calendário de revisão — as mais esquecidas vêm primeiro.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              size="lg"
              onClick={() => iniciar(prioridade.length ? prioridade : licoes.slice(0, 8).map((l) => l.id))}
            >
              Revisar agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => iniciar(shuffleIds(licoes.map((l) => l.id)).slice(0, 10))}
            >
              Revisão extra
            </Button>
          </div>
          {prioridade.slice(0, 6).map((id) => {
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
