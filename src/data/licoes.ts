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
  | {
      kind: "mista";
      vocab: VocabItem[];
      kanji: Kanji[];
      points: GrammarPoint[];
    };

export type Licao = {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: "Escrita" | "Lição completa";
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
  const vocabL = vocabulario.filter((v) => v.level === level);
  const kanjiL = kanji.filter((k) => k.level === level);
  const gramL = gramatica.filter((g) => g.level === level);

  const vChunks = chunk(vocabL, 6);
  const kChunks = chunk(kanjiL, 3);
  const gChunks = chunk(gramL, 2);
  const total = Math.max(vChunks.length, kChunks.length, gChunks.length);

  return Array.from({ length: total }, (_, i): Licao => {
    const vocab = vChunks.length ? (vChunks[i % vChunks.length] ?? []) : [];
    const kanjiGroup = kChunks.length ? (kChunks[i % kChunks.length] ?? []) : [];
    const points = gChunks.length ? (gChunks[i % gChunks.length] ?? []) : [];
    const resumo = [
      vocab.map((v) => v.word).join(" · "),
      kanjiGroup.map((k) => k.char).join(" · "),
      points.map((p) => p.title).join(" · "),
    ]
      .filter(Boolean)
      .join("  |  ");

    return {
      id: `${level}-licao-${i + 1}`,
      title: `${level} — Lição ${i + 1}`,
      description: resumo,
      duration: "5 min",
      category: "Lição completa" as const,
      level,
      content: { kind: "mista" as const, vocab, kanji: kanjiGroup, points },
    };
  });
});

export const licoes: Licao[] = [...escrita, ...porNivel];

export const licaoPorId = (id: string): Licao | undefined => licoes.find((l) => l.id === id);

export const licoesPorNivel = (level: LicaoNivel): Licao[] =>
  licoes.filter((l) => l.level === level);

export const niveisDeLicao: LicaoNivel[] = ["Kana", ...jlptLevels];
