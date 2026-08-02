import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LevelTabs } from "@/components/level-tabs";
import { buildQuestions, licaoPorId, licoes, type JlptLevel } from "@/data/japanese";
import { useSrs } from "@/hooks/use-srs";
import { formatDue } from "@/lib/srs";
import { Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/revisao")({
  head: () => ({
    meta: [
      { title: "Revisão JLPT N5–N1 — Nihongo Quest" },
      {
        name: "description",
        content: "Quizzes de kanji, vocabulário e gramática para todos os níveis do JLPT.",
      },
      { property: "og:title", content: "Revisão JLPT N5–N1 — Nihongo Quest" },
      {
        property: "og:description",
        content: "Teste seus conhecimentos de japonês com quizzes por nível do JLPT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RevisaoPage,
});

function RevisaoPage() {
  const { dueIds, cards, scheduledCount } = useSrs();
  const [level, setLevel] = useState<JlptLevel>("N5");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = useMemo(() => buildQuestions(level, 10), [level]);
  const question = questions[current];
  const progress = questions.length
    ? Math.round(((current + (finished ? 1 : 0)) / questions.length) * 100)
    : 0;

  function changeLevel(l: JlptLevel) {
    setLevel(l);
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  function handleAnswer(index: number) {
    if (selected !== null || !question) return;
    setSelected(index);
    if (index === question.answer) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Revisão</h1>
        <p className="mt-1 text-muted-foreground">
          Quiz gerado a partir do conteúdo do nível escolhido.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agenda de revisão espaçada</CardTitle>
          <CardDescription>
            {scheduledCount === 0
              ? "Faça o quiz de uma lição para que ela entre no agendamento automático."
              : `${dueIds.length} lição(ões) para revisar agora · ${scheduledCount} agendadas no total.`}
          </CardDescription>
        </CardHeader>
        {scheduledCount > 0 && (
          <CardContent className="space-y-3">
            {dueIds.slice(0, 8).map((id) => {
              const l = licaoPorId(id);
              if (!l) return null;
              return (
                <div
                  key={id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
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
                    className={cn(buttonVariants({ size: "sm" }), "shrink-0")}
                  >
                    Revisar
                  </Link>
                </div>
              );
            })}
            {dueIds.length === 0 && (
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Nada vencido agora. Próximas revisões:</p>
                {Object.values(cards)
                  .sort((a, b) => a.due - b.due)
                  .slice(0, 5)
                  .map((c) => (
                    <div key={c.id} className="flex justify-between gap-3">
                      <span className="truncate">{licaoPorId(c.id)?.title ?? c.id}</span>
                      <span className="shrink-0">{formatDue(c.due)}</span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        )}
      </Card>

      <LevelTabs value={level} onChange={changeLevel} />

      {!question && !finished ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Nenhuma pergunta disponível para este nível.
          </CardContent>
        </Card>
      ) : finished ? (
        <Card>
          <CardHeader>
            <CardTitle>Resultado — {level}</CardTitle>
            <CardDescription>
              Você acertou {score} de {questions.length} perguntas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={Math.round((score / questions.length) * 100)} />
            <Button onClick={restart}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Refazer quiz
            </Button>
          </CardContent>
        </Card>
      ) : (
        question && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Pergunta {current + 1} de {questions.length}
                </CardTitle>
                <Badge variant="outline">{level}</Badge>
              </div>
              <CardDescription>Escolha a alternativa correta.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Progress value={progress} />
              <p className="font-display text-xl font-semibold">{question.question}</p>
              <div className="space-y-3">
                {question.options.map((opt, i) => {
                  const isAnswer = i === question.answer;
                  const isSelected = i === selected;
                  const show = selected !== null;
                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={show}
                      className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition-colors ${
                        show && isAnswer
                          ? "border-primary bg-primary/10"
                          : show && isSelected
                            ? "border-destructive bg-destructive/10"
                            : "border-border hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      <span className="font-medium">{opt}</span>
                      {show && isAnswer && <CheckCircle className="h-5 w-5 text-primary" />}
                      {show && isSelected && !isAnswer && (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                    </button>
                  );
                })}
              </div>
              {selected !== null && (
                <Button onClick={next} className="w-full">
                  {current + 1 >= questions.length ? "Ver resultado" : "Próxima pergunta"}
                </Button>
              )}
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
