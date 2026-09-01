import type { VocabItem } from "@/data/vocabulario";

export type Frase = {
  /** frase completa em japonês */
  jp: string;
  /** frase com lacuna no lugar da palavra */
  lacuna: string;
  /** tradução em português */
  pt: string;
  /** pedaços da frase, para o exercício de montar frase */
  tokens: string[];
};

const BLANK = "＿＿＿";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Complementos (tempo/lugar/pessoa) que deixam a frase mais rica e natural. */
type Comp = { jp: string[]; pt: string };

const tempos: Comp[] = [
  { jp: ["毎朝"], pt: "toda manhã" },
  { jp: ["今日", "は"], pt: "hoje" },
  { jp: ["明日", "は"], pt: "amanhã" },
  { jp: ["週末", "に"], pt: "no fim de semana" },
  { jp: ["夜", "に"], pt: "à noite" },
];

const lugares: Comp[] = [
  { jp: ["家", "で"], pt: "em casa" },
  { jp: ["学校", "で"], pt: "na escola" },
  { jp: ["公園", "で"], pt: "no parque" },
  { jp: ["駅", "の", "前", "で"], pt: "em frente à estação" },
  { jp: ["会社", "で"], pt: "no trabalho" },
];

const pessoas: Comp[] = [
  { jp: ["友達", "と"], pt: "com um amigo" },
  { jp: ["家族", "と"], pt: "com a família" },
  { jp: ["先生", "と"], pt: "com o professor" },
  { jp: ["一人", "で"], pt: "sozinho" },
];

const coisas: Comp[] = [
  { jp: ["この", "本"], pt: "este livro" },
  { jp: ["あの", "店"], pt: "aquela loja" },
  { jp: ["新しい", "かばん"], pt: "a bolsa nova" },
  { jp: ["日本語", "の", "授業"], pt: "a aula de japonês" },
];

/** Escolha determinística: a mesma palavra gera sempre a mesma frase. */
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
const pick = <T,>(arr: T[], seed: number, salt = 0) => arr[(seed + salt) % arr.length]!;

/**
 * Monta uma frase de contexto com complementos (tempo, lugar, pessoa),
 * para que o vocabulário seja sempre aprendido dentro de uma sentença.
 */
export function frase(v: VocabItem): Frase {
  const w = v.word;
  const m = (v.meaning.split(/[;,/]/)[0] ?? v.meaning).trim() || v.meaning;
  const s = hash(w);

  const build = (tokens: string[], pt: string): Frase => {
    const jp = tokens.join("");
    return { jp, lacuna: jp.replace(w, BLANK), pt, tokens };
  };

  const tempo = pick(tempos, s);
  const lugar = pick(lugares, s, 1);
  const pessoa = pick(pessoas, s, 2);
  const coisa = pick(coisas, s, 3);

  switch (v.type) {
    case "verbo":
      return build(
        [...tempo.jp, ...lugar.jp, ...pessoa.jp, w, "。"],
        `${cap(tempo.pt)} eu ${m} ${lugar.pt} ${pessoa.pt}.`,
      );
    case "adjetivo":
      return build(
        [...coisa.jp, "は", ...lugar.jp, "とても", w, "です", "。"],
        `${cap(coisa.pt)} é muito ${m} ${lugar.pt}.`,
      );
    case "advérbio":
      return build(
        [...tempo.jp, ...pessoa.jp, w, "日本語", "を", "勉強", "します", "。"],
        `${cap(tempo.pt)} eu estudo japonês ${m} ${pessoa.pt}.`,
      );
    case "saudação":
    case "expressão":
      return build(
        [...tempo.jp, ...lugar.jp, ...pessoa.jp, w, "と", "言いました", "。"],
        `${cap(tempo.pt)}, ${lugar.pt}, eu disse "${m}" ${pessoa.pt}.`,
      );
    case "pronome":
      return build(
        [w, "は", ...tempo.jp, ...lugar.jp, "日本語", "を", "勉強", "します", "。"],
        `${cap(m)} estuda japonês ${tempo.pt} ${lugar.pt}.`,
      );
    case "contador":
      return build(
        [...lugar.jp, w, "あります", "。"],
        `${cap(lugar.pt)} há ${m}.`,
      );
    case "conector":
    case "partícula":
      return build(
        ["これ", "は", "本", "です", "。", w, "、", "あそこ", "に", "ノート", "も", "あります", "。"],
        `Isto é um livro. ${cap(m)}, ali também há um caderno.`,
      );
    default:
      return build(
        [...lugar.jp, ...pessoa.jp, w, "を", "見ました", "。"],
        `${cap(lugar.pt)}, ${pessoa.pt}, eu vi ${m}.`,
      );
  }
}

/** Divide uma frase japonesa em pedaços aproveitáveis para montar a frase. */
export function tokenizarJa(jp: string): string[] {
  const limpo = jp.trim();
  const partes = limpo.match(/[一-龯ヶ]+[ぁ-ん]*|[ァ-ヴー]+|[ぁ-ん]{1,3}|[^\s]/g);
  if (!partes) return [limpo];
  return partes;
}
