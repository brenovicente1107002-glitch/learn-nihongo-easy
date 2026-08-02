import { kanji } from "@/data/kanji";
import { vocabulario } from "@/data/vocabulario";
import { gramatica } from "@/data/gramatica";
import type { Licao } from "@/data/licoes";
import type { Question } from "@/data/japanese";

/** Estado de repetição espaçada (SM-2) de uma lição. */
export type SrsCard = {
  id: string;
  /** fator de facilidade (>= 1.3) */
  ease: number;
  /** intervalo atual em dias */
  interval: number;
  /** número de repetições corretas consecutivas */
  reps: number;
  /** timestamp (ms) do próximo agendamento */
  due: number;
  /** timestamp (ms) da última revisão */
  lastReview: number;
  /** último desempenho em % de acertos */
  lastScore: number;
};

export const DAY = 24 * 60 * 60 * 1000;

/** Converte % de acertos do quiz em nota SM-2 (0–5). */
export const scoreToQuality = (accuracy: number): number => {
  if (accuracy >= 1) return 5;
  if (accuracy >= 0.85) return 4;
  if (accuracy >= 0.7) return 3;
  if (accuracy >= 0.5) return 2;
  if (accuracy >= 0.3) return 1;
  return 0;
};

/** Aplica o algoritmo SM-2 e devolve o novo estado do cartão. */
export function scheduleCard(
  prev: SrsCard | undefined,
  accuracy: number,
  now = Date.now(),
): SrsCard {
  const quality = scoreToQuality(accuracy);
  const base: SrsCard = prev ?? {
    id: "",
    ease: 2.5,
    interval: 0,
    reps: 0,
    due: now,
    lastReview: 0,
    lastScore: 0,
  };

  let { ease, interval, reps } = base;

  if (quality < 3) {
    // errou demais: volta para o começo e revisa ainda hoje/amanhã
    reps = 0;
    interval = quality <= 1 ? 0 : 1;
  } else {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 3;
    else interval = Math.round(interval * ease) || 1;
  }

  ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  return {
    id: base.id,
    ease: Number(ease.toFixed(2)),
    interval,
    reps,
    // intervalo 0 => revisar em ~10 minutos
    due: now + (interval === 0 ? 10 * 60 * 1000 : interval * DAY),
    lastReview: now,
    lastScore: Math.round(accuracy * 100),
  };
}

export const isDue = (card: SrsCard, now = Date.now()) => card.due <= now;

export function formatDue(due: number, now = Date.now()): string {
  const diff = due - now;
  if (diff <= 0) return "agora";
  const days = Math.round(diff / DAY);
  if (days >= 1) return days === 1 ? "amanhã" : `em ${days} dias`;
  const hours = Math.round(diff / (60 * 60 * 1000));
  if (hours >= 1) return `em ${hours}h`;
  return `em ${Math.max(1, Math.round(diff / 60000))} min`;
}

/* ---------- geração do quiz a partir do conteúdo da lição ---------- */

const pick = <T>(arr: T[], n: number, seed: number, exclude: (x: T) => boolean): T[] => {
  const out: T[] = [];
  let s = seed || 1;
  const tries = Math.min(arr.length * 3, 400);
  for (let i = 0; i < tries && out.length < n; i++) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const item = arr[s % arr.length];
    if (!item || exclude(item) || out.includes(item)) continue;
    out.push(item);
  }
  return out;
};

const shuffle = <T>(arr: T[], seed: number): T[] => {
  const a = [...arr];
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const j = s % (i + 1);
    const tmp = a[i]!;
    a[i] = a[j]!;
    a[j] = tmp;
  }
  return a;
};

const makeQuestion = (
  prompt: string,
  correct: string,
  wrong: string[],
  seed: number,
): Question | null => {
  const uniqueWrong = Array.from(new Set(wrong.filter((w) => w && w !== correct))).slice(0, 3);
  if (uniqueWrong.length < 3) return null;
  const options = shuffle([correct, ...uniqueWrong], seed);
  return { question: prompt, options, answer: options.indexOf(correct) };
};

/** Monta as perguntas de revisão de uma micro-lição específica. */
export function lessonQuestions(licao: Licao): Question[] {
  const out: Question[] = [];
  const content = licao.content;

  if (content.kind === "kana") {
    const pool = content.items;
    content.items.forEach((k, i) => {
      const wrong = pick(pool, 3, i + 11, (o) => o.romaji === k.romaji).map((o) => o.romaji);
      const q = makeQuestion(`Como se lê ${k.char}?`, k.romaji, wrong, i + 17);
      if (q) out.push(q);
    });
  }

  if (content.kind === "kanji") {
    const pool = kanji.filter((k) => k.level === licao.level);
    content.items.forEach((k, i) => {
      const wrong = pick(pool, 3, i + 23, (o) => o.meaning === k.meaning).map((o) => o.meaning);
      const q = makeQuestion(`Qual o significado do kanji ${k.char}?`, k.meaning, wrong, i + 29);
      if (q) out.push(q);
    });
  }

  if (content.kind === "vocab") {
    const pool = vocabulario.filter((v) => v.level === licao.level);
    content.items.forEach((v, i) => {
      const wrong = pick(pool, 3, i + 31, (o) => o.meaning === v.meaning).map((o) => o.meaning);
      const q = makeQuestion(`O que significa ${v.word} (${v.reading})?`, v.meaning, wrong, i + 37);
      if (q) out.push(q);
    });
  }

  if (content.kind === "gramatica") {
    const point = content.point;
    const wrong = pick(gramatica, 3, 41, (o) => o.title === point.title).map((o) => o.pattern);
    const q1 = makeQuestion(
      `Qual estrutura corresponde a "${point.title}"?`,
      point.pattern,
      wrong,
      43,
    );
    if (q1) out.push(q1);
    point.examples.slice(0, 3).forEach((ex, i) => {
      const wrongPt = pick(gramatica, 6, i + 47, (o) => o.title === point.title)
        .flatMap((o) => o.examples.map((e) => e.pt))
        .filter((pt) => pt !== ex.pt);
      const q = makeQuestion(`O que significa "${ex.jp}"?`, ex.pt, wrongPt, i + 53);
      if (q) out.push(q);
    });
  }

  return out;
}
