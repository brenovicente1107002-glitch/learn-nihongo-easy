import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProgress } from "@/hooks/use-progress";
import { jlptInfo, licoes, niveisDeLicao, type LicaoNivel } from "@/data/japanese";
import { Check, Play } from "lucide-react";

export const Route = createFileRoute("/licoes/")({
  head: () => ({
    meta: [
      { title: "Lições de japonês N5–N1 — Nihongo Quest" },
      {
        name: "description",
        content:
          "Centenas de micro-lições de japonês com kana, kanji, vocabulário e gramática integrados.",
      },
      { property: "og:title", content: "Lições de japonês N5–N1 — Nihongo Quest" },
      {
        property: "og:description",
        content: "Trilha de micro-lições: kana, kanji, vocabulário e gramática em um só lugar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LicoesPage,
});

const categorias = ["Todas", "Escrita", "Vocabulário", "Gramática", "Kanji"] as const;

function LicoesPage() {
  const [level, setLevel] = useState<LicaoNivel>("Kana");
  const [cat, setCat] = useState<(typeof categorias)[number]>("Todas");
  const { done } = useProgress();

  const doNivel = licoes.filter((l) => l.level === level);
  const lista = cat === "Todas" ? doNivel : doNivel.filter((l) => l.category === cat);
  const concluidas = done.length;
  const progresso = Math.round((concluidas / licoes.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Lições</h1>
        <p className="mt-1 text-muted-foreground">
          {licoes.length} micro-lições, do kana ao N1 — vocabulário e gramática vêm dentro da lição.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Progresso do curso</CardTitle>
          <CardDescription>
            {concluidas} de {licoes.length} lições concluídas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progresso} />
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        {niveisDeLicao.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setLevel(n)}
            className={cn(
              "rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors",
              level === n
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {n}
            <span className="ml-2 text-xs opacity-70">
              {licoes.filter((l) => l.level === n).length}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={cn(
              "rounded-md border px-3 py-1 text-xs font-medium transition-colors",
              cat === c
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {level !== "Kana" && (
        <Card>
          <CardHeader>
            <CardTitle>{jlptInfo[level].title}</CardTitle>
            <CardDescription>{jlptInfo[level].description}</CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="space-y-3">
        {lista.map((l, i) => {
          const feito = done.includes(l.id);
          return (
            <Card key={l.id}>
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold",
                      feito ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
                    )}
                  >
                    {feito ? <Check className="h-5 w-5" /> : i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-base">{l.title}</CardTitle>
                      <Badge variant="outline">{l.category}</Badge>
                    </div>
                    <CardDescription className="mt-1 line-clamp-2">{l.description}</CardDescription>
                    <div className="mt-2 text-xs text-muted-foreground">Duração: {l.duration}</div>
                  </div>
                </div>
                <Link
                  to="/licoes/$id"
                  params={{ id: l.id }}
                  className={cn(
                    buttonVariants({ variant: feito ? "secondary" : "default" }),
                    "shrink-0",
                  )}
                >
                  {feito ? (
                    "Revisar"
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Iniciar
                    </>
                  )}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
