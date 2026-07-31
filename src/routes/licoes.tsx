import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { licoes } from "@/data/japanese";
import { Check, Lock, Play } from "lucide-react";

export const Route = createFileRoute("/licoes")({
  head: () => ({
    meta: [
      { title: "Lições — Nihongo Quest" },
      { name: "description", content: "Caminho de lições para aprender japonês do básico ao intermediário." },
      { property: "og:title", content: "Lições — Nihongo Quest" },
      { property: "og:description", content: "Caminho de lições para aprender japonês do básico ao intermediário." },
    ],
  }),
  component: LicoesPage,
});

function LicoesPage() {
  const completed = licoes.filter((l) => l.completed).length;
  const progress = Math.round((completed / licoes.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Lições</h1>
        <p className="mt-1 text-muted-foreground">Siga o caminho de aprendizado passo a passo.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progresso do curso</CardTitle>
          <CardDescription>{completed} de {licoes.length} lições concluídas</CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {licoes.map((l, i) => (
          <Card key={l.id} className={l.locked ? "opacity-70" : undefined}>
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ${
                    l.completed
                      ? "bg-primary text-primary-foreground"
                      : l.locked
                      ? "bg-muted text-muted-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {l.completed ? <Check className="h-6 w-6" /> : i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-base">{l.title}</CardTitle>
                    <Badge variant="outline">{l.category}</Badge>
                  </div>
                  <CardDescription className="mt-1">{l.description}</CardDescription>
                  <div className="mt-2 text-xs text-muted-foreground">Duração: {l.duration}</div>
                </div>
              </div>
              <div className="shrink-0">
                {l.locked ? (
                  <Button variant="outline" disabled>
                    <Lock className="mr-2 h-4 w-4" />
                    Bloqueada
                  </Button>
                ) : l.completed ? (
                  <Button variant="secondary">Revisar</Button>
                ) : (
                  <Button>
                    <Play className="mr-2 h-4 w-4" />
                    Iniciar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
