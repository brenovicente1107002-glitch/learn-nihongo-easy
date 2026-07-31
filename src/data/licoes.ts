import { jlptLevels, type JlptLevel } from "./kanji";

export type Licao = {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  category: string;
  level: JlptLevel | "Kana";
};

export const licoes: Licao[] = [
  {
    id: "kana-1",
    title: "Hiragana: sons básicos",
    description: "As 46 formas básicas do hiragana: a, ka, sa, ta, na, ha, ma, ya, ra, wa, n.",
    duration: "15 min",
    completed: true,
    locked: false,
    category: "Escrita",
    level: "Kana",
  },
  {
    id: "kana-2",
    title: "Hiragana: dakuten e youon",
    description: "が、ざ、だ、ば、ぱ e as combinações きゃ、しゅ、ちょ.",
    duration: "15 min",
    completed: true,
    locked: false,
    category: "Escrita",
    level: "Kana",
  },
  {
    id: "kana-3",
    title: "Katakana completo",
    description: "Katakana básico, dakuten, youon e sons estrangeiros (ファ、ヴィ、ティ).",
    duration: "20 min",
    completed: false,
    locked: false,
    category: "Escrita",
    level: "Kana",
  },
  ...jlptLevels.flatMap<Licao>((level, i) => [
    {
      id: `${level}-kanji`,
      title: `Kanji ${level}`,
      description: `Kanji essenciais do nível ${level} com leituras on'yomi e kun'yomi.`,
      duration: "30 min",
      completed: false,
      locked: i > 0,
      category: "Kanji",
      level,
    },
    {
      id: `${level}-vocab`,
      title: `Vocabulário ${level}`,
      description: `Palavras-chave do nível ${level} organizadas por classe gramatical.`,
      duration: "25 min",
      completed: false,
      locked: i > 0,
      category: "Vocabulário",
      level,
    },
    {
      id: `${level}-gram`,
      title: `Gramática ${level}`,
      description: `Padrões gramaticais cobrados no ${level}, com exemplos traduzidos.`,
      duration: "35 min",
      completed: false,
      locked: i > 0,
      category: "Gramática",
      level,
    },
    {
      id: `${level}-review`,
      title: `Revisão ${level}`,
      description: `Quiz misto de kanji, vocabulário e gramática do nível ${level}.`,
      duration: "20 min",
      completed: false,
      locked: i > 0,
      category: "Revisão",
      level,
    },
  ]),
];
