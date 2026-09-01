import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Flame, GraduationCap, Layers, RefreshCw, Sparkles, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { licoes, vocabulario, gramatica, kanji } from "@/data/japanese";
import { useProgress } from "@/hooks/use-progress";
import { useSrs } from "@/hooks/use-srs";
import { formatDue } from "@/lib/srs";
import { licaoPorId } from "@/data/japanese";
import { AomaruTip } from "@/components/mascot";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nihongo Quest — Dashboard" },
      { name: "description", content: "Acompanhe seu progresso no aprendizado de japonês." },
      { property: "og:title", content: "Nihongo Quest — Dashboard" },
      { property: "og:description", content: "Acompanhe seu progresso no aprendizado de japonês." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { done } = useProgress();
  const { dueIds, cards, scheduledCount } = useSrs();
  const proximaRevisao = Object.values(cards).sort((a, b) => a.due - b.due)[0];
  const completedLessons = done.length;
  const totalLessons = licoes.length;
  const progress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
            Olá, estudante!
          </h1>
          <p className="mt-1 text-muted-foreground">Vamos continuar seu caminho no japonês hoje.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="accent" className="px-3 py-1">
            <Flame className="mr-1 h-4 w-4" />5 dias de sequência
          </Badge>
        </div>
      </div>

      <AomaruTip />



      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={GraduationCap}
          label="Lições concluídas"
          value={`${completedLessons}/${totalLessons}`}
        />
        <StatsCard
          icon={Layers}
          label="Palavras no curso"
          value={vocabulario.length.toLocaleString("pt-BR")}
        />
        <StatsCard
          icon={Sparkles}
          label="Kanji (jōyō)"
          value={kanji.length.toLocaleString("pt-BR")}
        />
        <StatsCard
          icon={Target}
          label="Pontos de gramática"
          value={gramatica.length.toLocaleString("pt-BR")}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Seu progresso</CardTitle>
            <CardDescription>Você concluiu {progress}% do módulo inicial.</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} />
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div className="rounded-lg bg-secondary p-3 text-center">
                <div className="font-display text-xl font-bold text-primary">2</div>
                <div className="text-muted-foreground">Hiragana</div>
              </div>
              <div className="rounded-lg bg-secondary p-3 text-center">
                <div className="font-display text-xl font-bold text-primary">2</div>
                <div className="text-muted-foreground">Katakana</div>
              </div>
              <div className="rounded-lg bg-secondary p-3 text-center">
                <div className="font-display text-xl font-bold text-primary">0</div>
                <div className="text-muted-foreground">Gramática</div>
              </div>
              <div className="rounded-lg bg-secondary p-3 text-center">
                <div className="font-display text-xl font-bold text-primary">0</div>
                <div className="text-muted-foreground">Kanji</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revisão espaçada</CardTitle>
            <CardDescription>
              {scheduledCount === 0
                ? "Faça o quiz de uma lição para ativar o agendamento automático."
                : dueIds.length > 0
                  ? `${dueIds.length} lição(ões) prontas para revisar agora.`
                  : proximaRevisao
                    ? `Tudo em dia. Próxima revisão ${formatDue(proximaRevisao.due)}.`
                    : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dueIds.slice(0, 3).map((id) => (
              <Link
                key={id}
                to="/licoes/$id"
                params={{ id }}
                className="block rounded-lg border border-border p-3 transition-colors hover:bg-accent"
              >
                <div className="truncate font-medium">{licaoPorId(id)?.title ?? id}</div>
                <div className="text-xs text-muted-foreground">
                  último resultado {cards[id]?.lastScore ?? 0}%
                </div>
              </Link>
            ))}
            <Link
              to="/revisao"
              className="inline-flex w-full items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Ver agenda
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próxima lição</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const next = licoes.find((l) => !done.includes(l.id));
              if (!next)
                return (
                  <p className="text-sm text-muted-foreground">
                    Todas as lições disponíveis foram concluídas!
                  </p>
                );
              return (
                <div className="space-y-4">
                  <div className="rounded-lg border border-border p-4">
                    <Badge variant="outline" className="mb-2">
                      {next.category}
                    </Badge>
                    <h3 className="font-display font-semibold">{next.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{next.description}</p>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Duração: {next.duration}
                    </div>
                  </div>
                  <Link
                    to="/licoes/$id"
                    params={{ id: next.id }}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Continuar
                  </Link>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vocabulário do dia</CardTitle>
            <CardDescription>5 palavras para revisar hoje.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {vocabulario.slice(0, 5).map((v, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div>
                    <div className="font-display text-lg font-semibold">{v.word}</div>
                    <div className="text-sm text-muted-foreground">{v.reading}</div>
                  </div>
                  <Badge variant="secondary">{v.meaning}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dica de gramática</CardTitle>
            <CardDescription>Regras essenciais para formar frases.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {gramatica.slice(0, 3).map((g, i) => (
                <Link
                  key={i}
                  to="/licoes"
                  className="block rounded-lg border border-border p-4 transition-colors hover:bg-accent"
                >
                  <div className="font-display font-semibold">{g.title}</div>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{g.explanation}</p>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/flashcards"
          className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-primary/5"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <div className="font-display font-semibold">Praticar flashcards</div>
            <div className="text-sm text-muted-foreground">Revisar cartões de memória</div>
          </div>
        </Link>
        <Link
          to="/revisao"
          className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30 hover:bg-primary/5"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <RefreshCw className="h-6 w-6" />
          </div>
          <div>
            <div className="font-display font-semibold">Revisar conteúdo</div>
            <div className="text-sm text-muted-foreground">Quiz rápido de fixação</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

function StatsCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="font-display text-2xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}
