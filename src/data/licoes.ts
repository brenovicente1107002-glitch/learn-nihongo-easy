import { jlptLevels, kanji, type JlptLevel, type Kanji } from "./kanji";
import { vocabulario, type VocabItem } from "./vocabulario";
import { gramatica, type GrammarPoint } from "./gramatica";
import { temaDe, temas, type Tema } from "./temas";
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
  /** unidade temática à qual a lição pertence (ex.: "Comida", "Viagem") */
  unidadeId: string;
  unidadeTitulo: string;
  unidadeEmoji: string;
  /** capítulo dentro da unidade (1 = palavras novas, 2–7 = revisão) */
  capitulo: number;
  capituloTitulo: string;
  /** "novas" = aprender palavras; "revisao" = revisar palavras e frases */
  modo: "novas" | "revisao";
};

export type Unidade = {
  id: string;
  titulo: string;
  emoji: string;
  level: LicaoNivel;
  /** número da unidade dentro do nível */
  numero: number;
  capitulos: { numero: number; titulo: string; licoes: Licao[] }[];
  licoes: Licao[];
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
    unidadeId: `kana-${slug}`,
    unidadeTitulo: label,
    unidadeEmoji: "✍️",
    capitulo: 1,
    capituloTitulo: "Caracteres novos",
    modo: "novas" as const,
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

/** Cada unidade tem 1 capítulo de palavras novas (3 lições) + 6 capítulos de revisão. */
const CAPITULOS_REVISAO = [
  "Frases com as palavras",
  "Escuta e pronúncia",
  "Revisão rápida",
  "Montar frases",
  "Kanji e gramática",
  "Desafio da unidade",
];

/** palavras por unidade: 3 lições de palavras novas com 4 palavras cada */
const PALAVRAS_POR_UNIDADE = 12;

const unidadesDoNivel = (level: JlptLevel): Unidade[] => {
  const vocabL = vocabulario.filter((v) => v.level === level);
  const kanjiL = kanji.filter((k) => k.level === level);
  const gramL = gramatica.filter((g) => g.level === level);
  const kChunks = chunk(kanjiL, 3);
  const gChunks = chunk(gramL, 2);

  // agrupa o vocabulário do nível por tema, mantendo a ordem dos temas
  const porTema = new Map<string, { tema: Tema; itens: VocabItem[] }>();
  for (const v of vocabL) {
    const t = temaDe(v);
    const atual = porTema.get(t.slug);
    if (atual) atual.itens.push(v);
    else porTema.set(t.slug, { tema: t, itens: [v] });
  }
  const ordem = [...temas.map((t) => t.slug), "geral"];
  const grupos = [...porTema.values()].sort(
    (a, b) => ordem.indexOf(a.tema.slug) - ordem.indexOf(b.tema.slug),
  );

  const unidades: Unidade[] = [];
  let numero = 0;

  for (const grupo of grupos) {
    for (const [bloco, palavras] of chunk(grupo.itens, PALAVRAS_POR_UNIDADE).entries()) {
      numero += 1;
      const u = numero;
      const id = `${level}-${grupo.tema.slug}-${bloco + 1}`;
      const kanjiGroup = kChunks.length ? (kChunks[(u - 1) % kChunks.length] ?? []) : [];
      const points = gChunks.length ? (gChunks[(u - 1) % gChunks.length] ?? []) : [];
      const resumo = palavras.map((v) => v.word).join(" · ");

      const base = {
        duration: "5 min",
        category: "Lição completa" as const,
        level,
        unidadeId: id,
        unidadeTitulo: grupo.tema.nome,
        unidadeEmoji: grupo.tema.emoji,
      };

      // capítulo 1 — 3 lições de palavras novas
      const novas = chunk(palavras, Math.ceil(palavras.length / 3)).map(
        (parte, i): Licao => ({
          ...base,
          id: `${id}-c1-l${i + 1}`,
          title: `${grupo.tema.nome} — Palavras ${i + 1}`,
          description: parte.map((v) => `${v.word} (${v.meaning})`).join(" · "),
          content: { kind: "mista" as const, vocab: parte, kanji: [], points: [] },
          capitulo: 1,
          capituloTitulo: "Palavras novas",
          modo: "novas" as const,
        }),
      );

      // capítulos 2–7 — revisão das palavras da unidade em frases
      const revisoes = CAPITULOS_REVISAO.map(
        (titulo, i): Licao => ({
          ...base,
          id: `${id}-c${i + 2}`,
          title: `${grupo.tema.nome} — ${titulo}`,
          description: resumo,
          content: {
            kind: "mista" as const,
            vocab: palavras,
            kanji: i >= 4 ? kanjiGroup : [],
            points: i >= 4 ? points : [],
          },
          capitulo: i + 2,
          capituloTitulo: titulo,
          modo: "revisao" as const,
        }),
      );

      const licoesUnidade = [...novas, ...revisoes];
      unidades.push({
        id,
        titulo: grupo.tema.nome,
        emoji: grupo.tema.emoji,
        level,
        numero: u,
        capitulos: [
          { numero: 1, titulo: "Palavras novas", licoes: novas },
          ...revisoes.map((l) => ({ numero: l.capitulo, titulo: l.capituloTitulo, licoes: [l] })),
        ],
        licoes: licoesUnidade,
      });
    }
  }

  return unidades;
};

const unidadesKana: Unidade[] = [...new Set(escrita.map((l) => l.unidadeId))].map((id, i) => {
  const grupo = escrita.filter((l) => l.unidadeId === id);
  return {
    id,
    titulo: grupo[0]!.unidadeTitulo.replace(/ \d+$/, ""),
    emoji: "✍️",
    level: "Kana" as const,
    numero: i + 1,
    capitulos: [{ numero: 1, titulo: "Caracteres novos", licoes: grupo }],
    licoes: grupo,
  };
});

export const unidades: Unidade[] = [
  ...unidadesKana,
  ...jlptLevels.flatMap((level) => unidadesDoNivel(level)),
];

export const licoes: Licao[] = unidades.flatMap((u) => u.licoes);

export const unidadesPorNivel = (level: LicaoNivel): Unidade[] =>
  unidades.filter((u) => u.level === level);

export const licaoPorId = (id: string): Licao | undefined => licoes.find((l) => l.id === id);

export const licoesPorNivel = (level: LicaoNivel): Licao[] =>
  licoes.filter((l) => l.level === level);

export const niveisDeLicao: LicaoNivel[] = ["Kana", ...jlptLevels];
