import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, CheckCircle, RotateCcw } from "lucide-react";
import type { Licao } from "@/data/licoes";
import { formatDue, lessonQuestions, type SrsCard } from "@/lib/srs";

type Props = {
  licao: Licao;
  onFinish: (accuracy: number) => SrsCard | void;
  card?: SrsCard | undefined;
};

export function LessonQuiz({ licao, onFinish, card }: Props) {
  const questions = useMemo(() => lessonQuestions(licao), [licao]);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [hits, setHits] = useState(0);
  const [result, setResult] = useState<{ accuracy: number; due: number } | null>(null);

  if (questions.length === 0) return null;

  const question = questions[current];

  const start = () => {
    setStarted(true);
    setCurrent(0);
    setSelected(null);
    setHits(0);
    setResult(null);
  };

  const answer = (i: number) => {
    if (selected !== null || !question) return;
    setSelected(i);
    if (i === question.answer) setHits((h) => h + 1);
  };

  const next = () => {
    const correct = selected === question?.answer;
    const finalHits = hits;
    if (current + 1 >= questions.length) {
      const accuracy = finalHits / questions.length;
      const updated = onFinish(accuracy);
      setResult({
        accuracy,
        due: updated && typeof updated === "object" ? updated.due : Date.now(),
      });
      setStarted(false);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
    void correct;
  };

  if (result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            {Math.round(result.accuracy * 100)}% de acerto
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" />
            Próxima revisão desta lição: {formatDue(result.due)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" onClick={start}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Refazer agora
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!started) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz da lição</CardTitle>
          <CardDescription>
            {questions.length} perguntas. Seu desempenho define quando esta lição volta na revisão
            espaçada.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button onClick={start}>Fazer quiz e agendar revisão</Button>
          {card && (
            <span className="text-sm text-muted-foreground">
              Último resultado: {card.lastScore}% · volta {formatDue(card.due)}
            </span>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            Pergunta {current + 1} de {questions.length}
          </CardTitle>
          <Badge variant="outline">{licao.level}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Progress value={Math.round((current / questions.length) * 100)} />
        <p className="font-display text-xl font-semibold">{question?.question}</p>
        <div className="space-y-3">
          {question?.options.map((opt, i) => {
            const show = selected !== null;
            const isAnswer = i === question.answer;
            const isSelected = i === selected;
            return (
              <button
                key={i}
                type="button"
                onClick={() => answer(i)}
                disabled={show}
                className={`w-full rounded-lg border p-4 text-left transition-colors ${
                  show && isAnswer
                    ? "border-primary bg-primary/10"
                    : show && isSelected
                      ? "border-destructive bg-destructive/10"
                      : "border-border hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                <span className="font-medium">{opt}</span>
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <Button onClick={next} className="w-full">
            {current + 1 >= questions.length ? "Finalizar e agendar" : "Próxima"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
