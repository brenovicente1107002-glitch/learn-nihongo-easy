import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  RefreshCw,
  Search,
  Volume2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { LevelTabs } from "@/components/level-tabs";
import { licoes, type JlptLevel, type Licao, type VocabItem } from "@/data/japanese";
import { useProgress } from "@/hooks/use-progress";
import { useSrs } from "@/hooks/use-srs";
import { formatDue, isDue } from "@/lib/srs";
import { speakJa } from "@/lib/tts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/palavras")({
  head: () => ({
    meta: [
      { title: "Minhas palavras em japonês — Nihongo Quest" },
      {
        name: "description",
        content:
          "Veja todas as palavras aprendidas, o progresso das lições e quando cada uma precisa ser revisada.",
      },
      { property: "og:title", content: "Minhas palavras em japonês — Nihongo Quest" },
      {
        property: "og:description",
        content: "Acompanhe vocábulos aprendidos, lições concluídas e revisões espaçadas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PalavrasPage,
});

type StatusPalavra = "nova" | "aprendida" | "revisar" | "em-dia";
type Filtro = "todas" | "aprendidas" | StatusPalavra;

type EntradaBase = {
  item: VocabItem;
  licoes: Licao[];
};

type EntradaPalavra = EntradaBase & {
  status: StatusPalavra;
  licoesFeitas: number;
  revisoesFeitas: number;
  totalRevisoes: number;
  progresso: number;
  proximaRevisao?: number;
  ultimoScore?: number;
  proximaLicao: Licao;
};

/** Liga cada palavra às lições da unidade em que ela aparece. */
const palavrasDoCurso: EntradaBase[] = (() => {
  const mapa = new Map<string, EntradaBase>();
  for (const licao of licoes) {
    if (licao.content.kind !== "mista") continue;
    for (const item of licao.content.vocab) {
      const chave = `${item.level}|${item.word}|${item.reading}|${item.meaning}`;
      const atual = mapa.get(chave);
      if (atual) {
        if (!atual.licoes.some((l) => l.id === licao.id)) atual.licoes.push(licao);
      } else {
        mapa.set(chave, { item, licoes: [licao] });
      }
    }
  }
  return [...mapa.values()];
})();

const normalizar = (texto: string) =>
  texto
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const filtros: { id: Filtro; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "aprendidas", label: "Aprendidas" },
  { id: "revisar", label: "Revisar agora" },
  { id: "em-dia", label: "Em dia" },
  { id: "nova", label: "Novas" },
];

const statusInfo: Record<StatusPalavra, { label: string; className: string }> = {
  nova: { label: "Nova", className: "bg-secondary text-secondary-foreground" },
  aprendida: { label: "Aprendida", className: "bg-primary/10 text-primary" },
  revisar: { label: "Revisar agora", className: "bg-destructive/10 text-destructive" },
  "em-dia": { label: "Em dia", className: "bg-emerald-100 text-emerald-700" },
};

const prioridadeStatus: Record<StatusPalavra, number> = {
  revisar: 0,
  aprendida: 1,
  "em-dia": 2,
  nova: 3,
};

function PalavrasPage() {
  const { done } = useProgress();
  const { cards, now } = useSrs();
  const [level, setLevel] = useState<JlptLevel>("N5");
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [busca, setBusca] = useState("");
  const [limite, setLimite] = useState(80);

  const agora = now || Date.now();

  const entradas = useMemo(() => {
    const feitas = new Set(done);

    return palavrasDoCurso.map((base): EntradaPalavra | null => {
      const licoesDaPalavra = [...base.licoes].sort((a, b) => a.capitulo - b.capitulo);
      if (!licoesDaPalavra.length) return null;

      const novas = licoesDaPalavra.filter((l) => l.modo === "novas");
      const revisoes = licoesDaPalavra.filter((l) => l.modo === "revisao");
      const aprendeu = novas.some((l) => feitas.has(l.id));
      const licoesFeitas = licoesDaPalavra.filter((l) => feitas.has(l.id)).length;
      const revisoesFeitas = revisoes.filter((l) => feitas.has(l.id)).length;

      const agendadas = licoesDaPalavra.flatMap((l) => {
        const card = cards[l.id];
        return card ? [{ licao: l, card }] : [];
      });
      const vencidas = agendadas
        .filter(({ card }) => isDue(card, agora))
        .sort((a, b) => a.card.due - b.card.due);
      const futuras = agendadas
        .filter(({ card }) => !isDue(card, agora))
        .sort((a, b) => a.card.due - b.card.due);
      const ultima = [...agendadas].sort((a, b) => b.card.lastReview - a.card.lastReview)[0];

      const status: StatusPalavra = !aprendeu
        ? "nova"
        : vencidas.length > 0
          ? "revisar"
          : agendadas.length > 0
            ? "em-dia"
            : "aprendida";

      const proximaLicao =
        vencidas[0]?.licao ??
        licoesDaPalavra.find((l) => !feitas.has(l.id) && l.modo === "revisao") ??
        licoesDaPalavra.find((l) => !feitas.has(l.id)) ??
        futuras[0]?.licao ??
        licoesDaPalavra[0]!;

      return {
        ...base,
        licoes: licoesDaPalavra,
        status,
        licoesFeitas,
        revisoesFeitas,
        totalRevisoes: revisoes.length,
        progresso: Math.round((licoesFeitas / licoesDaPalavra.length) * 100),
        proximaRevisao: vencidas[0]?.card.due ?? futuras[0]?.card.due,
        ultimoScore: ultima?.card.lastScore,
        proximaLicao,
      };
    }).filter((entrada): entrada is EntradaPalavra => !!entrada);
  }, [done, cards, agora]);

  const entradasDoNivel = useMemo(
    () => entradas.filter((entrada) => entrada.item.level === level),
    [entradas, level],
  );

  const contagens = useMemo(() => {
    const total: Record<Filtro, number> = {
      todas: entradasDoNivel.length,
      aprendidas: 0,
      nova: 0,
      aprendida: 0,
      revisar: 0,
      "em-dia": 0,
    };
    for (const entrada of entradasDoNivel) {
      total[entrada.status] += 1;
      if (entrada.status !== "nova") total.aprendidas += 1;
    }
    return total;
  }, [entradasDoNivel]);

  const filtradas = useMemo(() => {
    const termo = normalizar(busca.trim());
    return entradasDoNivel
      .filter((entrada) => {
        if (filtro === "aprendidas" && entrada.status === "nova") return false;
        if (filtro !== "todas" && filtro !== "aprendidas" && entrada.status !== filtro) return false;
        if (!termo) return true;
        const texto = normalizar(
          `${entrada.item.word} ${entrada.item.reading} ${entrada.item.meaning} ${entrada.item.type} ${entrada.proximaLicao.unidadeTitulo}`,
        );
        return texto.includes(termo);
      })
      .sort((a, b) => {
        const status = prioridadeStatus[a.status] - prioridadeStatus[b.status];
        if (status !== 0) return status;
        const revisao = (a.proximaRevisao ?? Number.MAX_SAFE_INTEGER) -
          (b.proximaRevisao ?? Number.MAX_SAFE_INTEGER);
        if (revisao !== 0) return revisao;
        return a.item.word.localeCompare(b.item.word, "ja");
      });
  }, [entradasDoNivel, filtro, busca]);

  const visiveis = filtradas.slice(0, limite);
  const aprendidas = contagens.aprendidas;
  const paraRevisar = contagens.revisar;
  const emDia = contagens["em-dia"];

  const resetLimite = () => setLimite(80);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Minhas palavras</h1>
          <p className="mt-1 text-muted-foreground">
            Veja o que você já aprendeu e revise só o que precisa de atenção.
          </p>
        </div>
        <Badge variant="outline" className="w-fit px-3 py-1">
          {aprendidas.toLocaleString("pt-BR")} aprendidas neste nível
        </Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <ResumoCard
          icon={BookOpen}
          label="Aprendidas"
          valor={aprendidas}
          detalhe="lição de palavras concluída"
        />
        <ResumoCard
          icon={RefreshCw}
          label="Revisar agora"
          valor={paraRevisar}
          detalhe="vencidas no calendário"
          destaque={paraRevisar > 0}
        />
        <ResumoCard
          icon={CheckCircle2}
          label="Em dia"
          valor={emDia}
          detalhe="sem revisão vencida"
        />
      </div>

      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <LevelTabs
              value={level}
              onChange={(novoLevel) => {
                setLevel(novoLevel);
                resetLimite();
              }}
            />
            <div className="relative lg:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={busca}
                onChange={(event) => {
                  setBusca(event.target.value);
                  resetLimite();
                }}
                placeholder="Buscar palavra, leitura ou significado"
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {filtros.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setFiltro(item.id);
                  resetLimite();
                }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  filtro === item.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {item.label}
                <span className="ml-2 text-xs opacity-70">{contagens[item.id]}</span>
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {visiveis.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center">
              <Clock3 className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-3 font-medium">Nenhuma palavra encontrada.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Conclua uma lição de palavras ou ajuste a busca para ver resultados aqui.
              </p>
            </div>
          ) : (
            visiveis.map((entrada) => (
              <PalavraCard key={`${entrada.item.level}-${entrada.item.word}-${entrada.item.reading}`} entrada={entrada} agora={agora} />
            ))
          )}

          {filtradas.length > limite && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setLimite((valor) => valor + 80)}
                className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}
              >
                Mostrar mais {Math.min(80, filtradas.length - limite)} palavras
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ResumoCard({
  icon: Icon,
  label,
  valor,
  detalhe,
  destaque = false,
}: {
  icon: React.ElementType;
  label: string;
  valor: number;
  detalhe: string;
  destaque?: boolean;
}) {
  return (
    <Card className={cn(destaque && "border-destructive/40 bg-destructive/5")}>
      <CardContent className="flex items-center gap-3 p-4">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            destaque ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-2xl font-bold">{valor.toLocaleString("pt-BR")}</div>
          <div className="text-sm font-medium">{label}</div>
          <div className="truncate text-xs text-muted-foreground">{detalhe}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function PalavraCard({ entrada, agora }: { entrada: EntradaPalavra; agora: number }) {
  const status = statusInfo[entrada.status];
  const primeira = entrada.licoes[0]!;

  const revisaoTexto =
    entrada.status === "nova"
      ? "Ainda não foi aprendida"
      : entrada.status === "revisar"
        ? `Revisar agora${entrada.ultimoScore !== undefined ? ` · último resultado ${entrada.ultimoScore}%` : ""}`
        : entrada.status === "em-dia" && entrada.proximaRevisao
          ? `Próxima revisão ${formatDue(entrada.proximaRevisao, agora)}`
          : "Lição feita · revisão ainda não agendada";

  return (
    <article className="rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-2xl font-bold tracking-tight">{entrada.item.word}</span>
            <button
              type="button"
              onClick={() => void speakJa(entrada.item.word)}
              aria-label={`Ouvir ${entrada.item.word}`}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
            >
              <Volume2 className="h-4 w-4" />
            </button>
            <Badge variant="outline">{entrada.item.level}</Badge>
          </div>
          <div className="mt-1 text-sm font-medium text-primary">{entrada.item.reading}</div>
          <div className="mt-1 text-sm text-muted-foreground">{entrada.item.meaning}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="secondary">
              {primeira.unidadeEmoji} {primeira.unidadeTitulo}
            </Badge>
            <Badge variant="outline">{entrada.item.type}</Badge>
          </div>
        </div>
        <Badge className={cn("shrink-0", status.className)}>{status.label}</Badge>
      </div>

      <div className="mt-4 grid gap-4 border-t border-border pt-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="space-y-2">
          <div className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
            <span>
              Lições: {entrada.licoesFeitas}/{entrada.licoes.length} · Revisões: {entrada.revisoesFeitas}/{entrada.totalRevisoes}
            </span>
            <span>{revisaoTexto}</span>
          </div>
          <Progress value={entrada.progresso} />
        </div>
        <Link
          to="/licoes/$id"
          params={{ id: entrada.proximaLicao.id }}
          className={cn(buttonVariants({ variant: entrada.status === "revisar" ? "default" : "outline" }), "justify-center")}
        >
          {entrada.status === "nova" ? "Aprender" : entrada.status === "revisar" ? "Revisar" : "Abrir"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
