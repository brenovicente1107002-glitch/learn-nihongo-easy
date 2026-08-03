import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useProgress } from "@/hooks/use-progress";
import { useSrs } from "@/hooks/use-srs";
import { licoes } from "@/data/japanese";
import { CloudCheck, LogOut } from "lucide-react";

export const Route = createFileRoute("/conta")({
  head: () => ({
    meta: [
      { title: "Sua conta — Nihongo Quest" },
      {
        name: "description",
        content: "Entre com o Google para salvar seu progresso de japonês em qualquer aparelho.",
      },
      { property: "og:title", content: "Sua conta — Nihongo Quest" },
      {
        property: "og:description",
        content: "Progresso, revisões e XP salvos na nuvem com login do Google.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContaPage,
});

function ContaPage() {
  const { user, carregando, entrarComGoogle, sair } = useAuth();
  const { done } = useProgress();
  const { scheduledCount } = useSrs();
  const [erro, setErro] = useState<string | null>(null);

  const entrar = async () => {
    setErro(null);
    const result = await entrarComGoogle();
    if (result.error) setErro("Não foi possível entrar. Tente novamente.");
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Sua conta</h1>
        <p className="mt-1 text-muted-foreground">
          Entre com o Google para que seu progresso continue mesmo se você trocar de aparelho.
        </p>
      </div>

      {carregando ? (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">Carregando…</CardContent>
        </Card>
      ) : user ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudCheck className="h-5 w-5 text-primary" />
              Progresso salvo na nuvem
            </CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border p-4">
                <div className="font-display text-2xl font-bold">{done.length}</div>
                <div className="text-xs text-muted-foreground">lições concluídas</div>
              </div>
              <div className="rounded-xl border border-border p-4">
                <div className="font-display text-2xl font-bold">{scheduledCount}</div>
                <div className="text-xs text-muted-foreground">lições em revisão</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Trilha total: {licoes.length} lições.
            </div>
            <Button variant="outline" onClick={() => void sair()}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Entrar com o Google</CardTitle>
            <CardDescription>
              Suas lições concluídas e o calendário de revisão ficam salvos na sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button size="lg" onClick={() => void entrar()}>
              Continuar com o Google
            </Button>
            {erro && <p className="text-sm text-destructive">{erro}</p>}
            <p className="text-xs text-muted-foreground">
              Sem conta, o progresso fica salvo só neste navegador.
            </p>
          </CardContent>
        </Card>
      )}

      <Link to="/licoes" className="inline-block text-sm text-primary hover:underline">
        Ir para as lições
      </Link>
    </div>
  );
}
