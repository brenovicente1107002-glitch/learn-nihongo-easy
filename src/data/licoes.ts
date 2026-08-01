import { jlptLevels, kanji, type JlptLevel, type Kanji } from "./kanji";
import { vocabulario, type VocabItem } from "./vocabulario";
import { gramatica, type GrammarPoint } from "./gramatica";
import {
  hiragana,
  hiraganaDakuten,
  hiraganaYouon,
  katakana,
  katakanaDakuten,
  katakanaYouon,
  katakanaExtra,
  type KanaItem,
} from "./kana";

export type LicaoNivel = JlptLevel | "Kana";

export type LicaoConteudo =
  | { kind: "kana"; items: KanaItem[] }
  | { kind: "kanji"; items: Kanji[] }
  | { kind: "vocab"; items: VocabItem[] }
  | { kind: "gramatica"; point: GrammarPoint };

export type Licao = {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: "Escrita" | "Kanji" | "Vocabulário" | "Gramática";
  level: LicaoNivel;
  content: LicaoConteudo;
};

const chunk = <T>(arr: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
};

const kanaLessons = (slug: string, label: string, items: KanaItem[], size = 5): Licao[] =>
  chunk(items, size).map((group, i) => ({
    id: `kana-${slug}-${i + 1}`,
    title: `${label} ${i + 1}`,
    description: group.map((k) => `${k.char} (${k.romaji})`).join("  ·  "),
    duration: "3 min",
    category: "Escrita" as const,
    level: "Kana" as const,
    content: { kind: "kana" as const, items: group },
  }));

const escrita: Licao[] = [
  ...kanaLessons("hira", "Hiragana básico", hiragana),
  ...kanaLessons("hira-daku", "Hiragana dakuten", hiraganaDakuten),
  ...kanaLessons("hira-youon", "Hiragana youon", hiraganaYouon),
  ...kanaLessons("kata", "Katakana básico", katakana),
  ...kanaLessons("kata-daku", "Katakana dakuten", katakanaDakuten),
  ...kanaLessons("kata-youon", "Katakana youon", katakanaYouon),
  ...kanaLessons("kata-extra", "Katakana estrangeiro", katakanaExtra),
];

const porNivel: Licao[] = jlptLevels.flatMap((level) => {
  const vocabDoNivel = vocabulario.filter((v) => v.level === level);
  const tipos = Array.from(new Set(vocabDoNivel.map((v) => v.type)));

  const vocabLessons: Licao[] = tipos.flatMap((tipo) =>
    chunk(
      vocabDoNivel.filter((v) => v.type === tipo),
      5,
    ).map((group, i) => ({
      id: `${level}-vocab-${tipo}-${i + 1}`.replace(/\s+/g, "-"),
      title: `${tipo.charAt(0).toUpperCase()}${tipo.slice(1)}s ${level} — parte ${i + 1}`,
      description: group.map((v) => `${v.word} (${v.meaning})`).join("  ·  "),
      duration: "4 min",
      category: "Vocabulário" as const,
      level,
      content: { kind: "vocab" as const, items: group },
    })),
  );

  const kanjiLessons: Licao[] = chunk(
    kanji.filter((k) => k.level === level),
    5,
  ).map((group, i) => ({
    id: `${level}-kanji-${i + 1}`,
    title: `Kanji ${level} — parte ${i + 1}`,
    description: group.map((k) => `${k.char} (${k.meaning})`).join("  ·  "),
    duration: "5 min",
    category: "Kanji" as const,
    level,
    content: { kind: "kanji" as const, items: group },
  }));

  const gramLessons: Licao[] = gramatica
    .filter((g) => g.level === level)
    .map((point, i) => ({
      id: `${level}-gram-${i + 1}`,
      title: `${point.title} (${level})`,
      description: point.explanation,
      duration: "6 min",
      category: "Gramática" as const,
      level,
      content: { kind: "gramatica" as const, point },
    }));

  return [...vocabLessons, ...kanjiLessons, ...gramLessons];
});

export const licoes: Licao[] = [...escrita, ...porNivel];

export const licaoPorId = (id: string): Licao | undefined => licoes.find((l) => l.id === id);

export const licoesPorNivel = (level: LicaoNivel): Licao[] =>
  licoes.filter((l) => l.level === level);

export const niveisDeLicao: LicaoNivel[] = ["Kana", ...jlptLevels];
