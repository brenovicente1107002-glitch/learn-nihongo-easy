import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { pararAudio, speakJa, ttsDisponivel } from "@/lib/tts";
import { DrawCanvas } from "@/components/draw-canvas";
import { JaText } from "@/components/furigana";
import { AomaruAvatar, conselhos } from "@/components/mascot";

import type { QuizQuestion } from "@/lib/srs";
import { Check, Heart, Mic, Volume2, X } from "lucide-react";

type Props = {
  questions: QuizQuestion[];
  onFinish: (accuracy: number) => void;
  onExit?: () => void;
  titulo?: string;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

const getRecognition = (): SpeechRecognitionLike | null => {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  return Ctor ? new Ctor() : null;
};

const limpar = (s: string) => s.replace(/[。、．，\s!?！？]/g, "");

/** Sessão de exercícios estilo Duolingo: progresso, vidas, escuta, fala e montar frase. */
export function LessonPlayer({ questions, onFinish, onExit, titulo }: Props) {
  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [montado, setMontado] = useState<number[]>([]);
  const [ouvindo, setOuvindo] = useState(false);
  const [falado, setFalado] = useState("");
  const [certoManual, setCertoManual] = useState(false);
  const [desenhou, setDesenhou] = useState(false);

  const q = questions[index];
  const audio = q?.audio;
  const kind = q?.kind ?? "escolha";

  useEffect(() => {
    if (audio && kind !== "montar") speakJa(audio);
    return () => pararAudio();
    // reexecuta a cada questão, mesmo que o texto do áudio se repita
  }, [index, audio, kind]);

  const progresso = useMemo(() => Math.round((index / Math.max(total, 1)) * 100), [index, total]);

  const tokens = q?.tokens ?? [];
  const fraseMontada = montado.map((i) => tokens[i] ?? "").join("");

  const ouvirFala = useCallback(() => {
    const rec = getRecognition();
    if (!rec || !q?.target) return;
    rec.lang = "ja-JP";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    setOuvindo(true);
    rec.onresult = (e) => {
      const txt = e.results[0]?.[0]?.transcript ?? "";
      setFalado(txt);
      setCertoManual(limpar(txt) === limpar(q.target ?? ""));
      setChecked(true);
      if (limpar(txt) === limpar(q.target ?? "")) setAcertos((a) => a + 1);
      else setVidas((v) => Math.max(0, v - 1));
    };
    rec.onerror = () => setOuvindo(false);
    rec.onend = () => setOuvindo(false);
    rec.start();
  }, [q]);

  if (!q) return null;

  const podeVerificar =
    kind === "montar"
      ? montado.length === tokens.length
      : kind === "fala" || kind === "escrita"
        ? false
        : selected !== null;

  const correto =
    kind === "montar"
      ? fraseMontada === q.target
      : kind === "fala" || kind === "escrita"
        ? certoManual
        : selected === q.answer;

  const verificar = () => {
    const ok =
      kind === "montar" ? fraseMontada === q.target : selected !== null && selected === q.answer;
    setChecked(true);
    if (ok) setAcertos((a) => a + 1);
    else setVidas((v) => Math.max(0, v - 1));
  };

  const continuar = (pular = false) => {
    if ((!pular && vidas === 0) || index + 1 >= total) {
      onFinish(acertos / total);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setChecked(false);
    setMontado([]);
    setFalado("");
    setCertoManual(false);
    setDesenhou(false);
  };

  return (
    <div className="space-y-6">
      {/* topo: sair, progresso, vidas */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onExit}
          aria-label="Sair da lição"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>
        <div className="flex items-center gap-1 text-primary">
          <Heart className="h-5 w-5 fill-current" />
          <span className="font-display text-sm font-bold">{vidas}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {q.tag && <Badge variant="outline">{q.tag}</Badge>}
        <Badge variant="accent">
          {kind === "escuta"
            ? "Escuta"
            : kind === "fala"
              ? "Fala"
              : kind === "montar"
                ? "Montar frase"
                : kind === "escrita"
                  ? "Escrever"
                  : "Escolha"}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {index + 1} de {total}
          {titulo ? ` · ${titulo}` : ""}
        </span>
      </div>

      {/* enunciado */}
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <h2 className="font-display text-2xl leading-[1.6] font-bold tracking-tight">
            <JaText text={q.question} />
          </h2>
          {audio && ttsDisponivel() && kind !== "montar" && (
            <button
              type="button"
              onClick={() => speakJa(audio)}
              aria-label="Ouvir em japonês"
              className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 text-primary transition-colors hover:bg-primary/10"
            >
              <Volume2 className="h-5 w-5" />
            </button>
          )}
        </div>
        {kind === "escuta" && audio && ttsDisponivel() && (
          <button
            type="button"
            onClick={() => speakJa(audio, 0.7)}
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-b-4 border-primary/40 bg-primary/5 px-5 py-4 font-display font-semibold text-primary"
          >
            <Volume2 className="h-6 w-6" />
            Ouvir devagar
          </button>
        )}
        {q.sub && !checked && kind !== "escuta" && kind !== "fala" && (
          <p className="text-sm text-muted-foreground">{q.sub}</p>
        )}
      </div>

      {/* exercício de fala */}
      {kind === "fala" && (
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-border p-5">
            <div className="font-display text-2xl font-bold">
              <JaText text={q.target ?? ""} />
            </div>
            {q.sub && <div className="mt-1 text-sm text-muted-foreground">{q.sub}</div>}
          </div>
          {getRecognition() ? (
            <Button size="lg" disabled={ouvindo || checked} onClick={ouvirFala}>
              <Mic className="mr-2 h-5 w-5" />
              {ouvindo ? "Ouvindo..." : "Falar"}
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Seu navegador não suporta reconhecimento de fala. Repita em voz alta e continue.
            </p>
          )}
          {falado && <p className="text-sm text-muted-foreground">Você disse: {falado}</p>}
        </div>
      )}

      {/* escrita à mão */}
      {kind === "escrita" && q.target && (
        <div className="space-y-4">
          <DrawCanvas char={q.target} resetKey={index} onDraw={setDesenhou} />
          {!checked && (
            <p className="text-center text-sm text-muted-foreground">
              Siga o guia com o dedo e depois esconda o guia para tentar de memória.
            </p>
          )}
        </div>
      )}

      {/* montar frase */}
      {kind === "montar" && (
        <div className="space-y-4">
          <div className="min-h-16 rounded-2xl border-2 border-dashed border-border p-4">
            <div className="flex flex-wrap gap-2">
              {montado.map((t, pos) => (
                <button
                  key={`sel-${t}-${pos}`}
                  type="button"
                  disabled={checked}
                  onClick={() => setMontado((m) => m.filter((_, i) => i !== pos))}
                  className="rounded-xl border-2 border-b-4 border-primary/40 bg-primary/10 px-3 py-2 font-display text-lg"
                >
                  <JaText text={tokens[t] ?? ""} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {tokens.map((t, i) => (
              <button
                key={`tok-${t}-${i}`}
                type="button"
                disabled={checked || montado.includes(i)}
                onClick={() => setMontado((m) => [...m, i])}
                className={cn(
                  "rounded-xl border-2 border-b-4 border-border bg-card px-3 py-2 font-display text-lg transition-colors hover:bg-accent",
                  montado.includes(i) && "opacity-30",
                )}
              >
                <JaText text={t} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* alternativas */}
      {(kind === "escolha" || kind === "escuta") && (
        <div className="grid gap-3 sm:grid-cols-2">
          {q.options.map((opt, i) => {
            const isSel = i === selected;
            const isAns = i === q.answer;
            return (
              <button
                key={`${opt}-${i}`}
                type="button"
                disabled={checked}
                onClick={() => setSelected(i)}
                className={cn(
                  "rounded-2xl border-2 border-b-4 p-4 text-left font-medium transition-all",
                  checked && isAns && "border-primary bg-primary/10 text-foreground",
                  checked && isSel && !isAns && "border-destructive bg-destructive/10",
                  !checked && isSel && "border-primary bg-primary/10",
                  !checked && !isSel && "border-border bg-card hover:bg-accent",
                  checked && !isAns && !isSel && "opacity-60",
                )}
              >
                <JaText text={opt} />
              </button>
            );
          })}
        </div>
      )}

      {/* barra de feedback */}
      <div
        className={cn(
          "rounded-2xl border-2 p-5 transition-colors",
          !checked && "border-transparent",
          checked && correto && "border-primary/40 bg-primary/10",
          checked && !correto && "border-destructive/40 bg-destructive/10",
        )}
      >
        {checked ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div
                className={cn(
                  "flex items-center gap-2 font-display text-lg font-bold",
                  correto ? "text-primary" : "text-destructive",
                )}
              >
                {correto ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                {correto ? "Muito bem!" : "Resposta certa:"}
              </div>
              {!correto && (
                <p className="mt-1 font-medium">
                  {kind === "montar" || kind === "fala" || kind === "escrita"
                    ? <JaText text={q.target ?? ""} />
                    : <JaText text={q.options[q.answer] ?? ""} />}
                </p>
              )}
              {q.sub && <p className="mt-1 text-sm text-muted-foreground">{q.sub}</p>}
              {!correto && (
                <div className="mt-3 flex items-center gap-2">
                  <AomaruAvatar
                    className="h-10 w-10 shrink-0"
                    expressao={conselhos[index % conselhos.length]!.expressao}
                  />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-primary">Aomaru: </span>
                    {conselhos[index % conselhos.length]!.texto}
                  </p>
                </div>
              )}
            </div>

            <Button size="lg" onClick={() => continuar()}>
              {vidas === 0 ? "Ver resultado" : index + 1 >= total ? "Finalizar" : "Continuar"}
            </Button>
          </div>
        ) : (
          <div className="flex justify-end gap-3">
            {kind === "fala" && (
              <Button size="lg" variant="outline" onClick={() => continuar(true)}>
                Pular
              </Button>
            )}
            {kind === "escrita" && (
              <>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setCertoManual(false);
                    setChecked(true);
                    setVidas((v) => Math.max(0, v - 1));
                  }}
                >
                  Errei
                </Button>
                <Button
                  size="lg"
                  disabled={!desenhou}
                  onClick={() => {
                    setCertoManual(true);
                    setChecked(true);
                    setAcertos((a) => a + 1);
                  }}
                >
                  Acertei
                </Button>
              </>
            )}
            {kind !== "fala" && kind !== "escrita" && (
              <Button size="lg" disabled={!podeVerificar} onClick={verificar}>
                Verificar
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
