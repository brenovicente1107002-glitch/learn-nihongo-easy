export * from "./kana";
export * from "./kanji";
export * from "./vocabulario";
export * from "./gramatica";
export * from "./licoes";

import { kanji } from "./kanji";
import { vocabulario } from "./vocabulario";
import { gramatica } from "./gramatica";
import type { JlptLevel } from "./kanji";

export const flashcards = vocabulario.map((v) => ({
  front: v.word,
  back: `${v.reading} — ${v.meaning}`,
  level: v.level,
}));

export const kanjiFlashcards = kanji.map((k) => ({
  front: k.char,
  back: `${k.meaning} — ${k.readings.join(", ")}`,
  level: k.level,
}));

const shuffle = <T>(arr: T[], seed: number): T[] => {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1103515245 + 12345) % 2147483648;
    const j = s % (i + 1);
    const tmp = a[i]!;
    a[i] = a[j]!;
    a[j] = tmp;
  }
  return a;
};

export type Question = { question: string; options: string[]; answer: number };

export const buildQuestions = (level: JlptLevel, count = 10): Question[] => {
  const vocab = vocabulario.filter((v) => v.level === level);
  const kj = kanji.filter((k) => k.level === level);
  const gr = gramatica.filter((g) => g.level === level);
  const pool: Question[] = [];

  vocab.forEach((v, i) => {
    const wrong = shuffle(
      vocab.filter((o) => o.meaning !== v.meaning),
      i + 7,
    )
      .slice(0, 3)
      .map((o) => o.meaning);
    if (wrong.length < 3) return;
    const options = shuffle([v.meaning, ...wrong], i + 13);
    pool.push({
      question: `O que significa ${v.word} (${v.reading})?`,
      options,
      answer: options.indexOf(v.meaning),
    });
  });

  kj.forEach((k, i) => {
    const wrong = shuffle(
      kj.filter((o) => o.meaning !== k.meaning),
      i + 31,
    )
      .slice(0, 3)
      .map((o) => o.meaning);
    if (wrong.length < 3) return;
    const options = shuffle([k.meaning, ...wrong], i + 41);
    pool.push({
      question: `Qual o significado do kanji ${k.char}?`,
      options,
      answer: options.indexOf(k.meaning),
    });
  });

  gr.forEach((g, i) => {
    const wrong = shuffle(
      gramatica.filter((o) => o.title !== g.title),
      i + 53,
    )
      .slice(0, 3)
      .map((o) => o.pattern);
    if (wrong.length < 3) return;
    const options = shuffle([g.pattern, ...wrong], i + 59);
    pool.push({
      question: `Qual o padrão de "${g.title}"?`,
      options,
      answer: options.indexOf(g.pattern),
    });
  });

  return shuffle(pool, 97).slice(0, count);
};

export const revisaoQuestions = buildQuestions("N5", 10);
