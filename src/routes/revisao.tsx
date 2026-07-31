import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { revisaoQuestions } from "@/data/japanese";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/revisao")({
  head: () => ({
    meta: [
      { title: "Revisão — Nihongo Quest" },
      { name: "description", content: "Teste seus conhecimentos de japonês com quizzes rápidos." },
      { property: "og:title", content: "Revisão — Nihongo Quest" },
      { property: "og:description", content: "Teste seus conhecimentos de japonês com quizzes rápidos." },
    ],
  }),
  component: RevisaoPage,
});

function RevisaoPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = revisaoQuestions[current];
  const progress = Math.round(((current + (finished ? 1 : 0)) / revisaoQuestions.length) * 100);

  if (!question) {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-muted-foreground">Nenhuma pergunta disponível.</p>
      </div>
    );
  }

  function handleAnswer(index: number) {
    if (selected !== null) return;
    setSelected(index);
    if (index === question.answer) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= revisaoQuestions.length) {
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
        <p className="mt-1 text-muted-foreground">Responda ao quiz para fixar o que você aprendeu.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Quiz de fixação</CardTitle>
            <Badge variant="accent">{score} acerto{score === 1 ? "" : "s"}</Badge>
          </div>
          <CardDescription>
            Pergunta {finished ? revisaoQuestions.length : current + 1} de {revisaoQuestions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Progress value={progress} />

          {finished ? (
            <div className="text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                {score >= revisaoQuestions.length / 2 ? <CheckCircle className="h-10 w-10" /> : <XCircle className="h-10 w-10" />}
              </div>
              <h2 className="font-display text-2xl font-bold">Quiz finalizado!</h2>
              <p className="mt-2 text-muted-foreground">
                Você acertou {score} de {revisaoQuestions.length} perguntas.
              </p>
              <Button onClick={restart} className="mt-6">
                <RotateCcw className="mr-2 h-4 w-4" />
                Refazer quiz
              </Button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-xl font-semibold text-foreground">{question.question}</h2>
              <div className="grid gap-3">
                {question.options.map((opt, idx) => {
                  const isCorrect = idx === question.answer;
                  const isWrong = selected === idx && selected !== question.answer;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={selected !== null}
                      className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors ${
                        selected === null
                          ? "border-border bg-card hover:bg-accent"
                          : isCorrect
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"
                          : isWrong
                          ? "border-red-400 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100"
                          : "border-border bg-card opacity-60"
                      }`}
                    >
                      <span className="font-display text-lg">{opt}</span>
                      {selected !== null && isCorrect && <CheckCircle className="h-5 w-5 text-emerald-600" />}
                      {selected !== null && isWrong && <XCircle className="h-5 w-5 text-red-600" />}
                    </button>
                  );
                })}
              </div>
              {selected !== null && (
                <div className="flex justify-end">
                  <Button onClick={next}>{current + 1 >= revisaoQuestions.length ? "Ver resultado" : "Próxima"}</Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
