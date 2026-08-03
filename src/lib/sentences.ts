import type { VocabItem } from "@/data/vocabulario";

export type Frase = {
  /** frase completa em japonês */
  jp: string;
  /** frase com lacuna no lugar da palavra */
  lacuna: string;
  /** tradução em português */
  pt: string;
};

const BLANK = "＿＿＿";

/**
 * Monta uma frase de contexto para a palavra, para que o vocabulário
 * seja sempre aprendido dentro de uma sentença.
 */
export function frase(v: VocabItem): Frase {
  const w = v.word;
  const m = v.meaning.split(/[;,/]/)[0]?.trim() || v.meaning;

  const build = (jp: string, pt: string): Frase => ({
    jp,
    lacuna: jp.replace(w, BLANK),
    pt,
  });

  switch (v.type) {
    case "verbo":
      return build(`毎日${w}。`, `${m} todos os dias.`);
    case "adjetivo":
      return build(`これはとても${w}です。`, `Isto é muito ${m}.`);
    case "advérbio":
      return build(`${w}わかりました。`, `${m}, entendi.`);
    case "saudação":
    case "expressão":
      return build(`${w}と言いました。`, `Disse "${m}".`);
    case "pronome":
      return build(`${w}は学生です。`, `${m} é estudante.`);
    case "contador":
      return build(`${w}あります。`, `Há ${m}.`);
    case "conector":
    case "partícula":
      return build(
        `これは本です。${w}、ノートもあります。`,
        `Isto é um livro. ${m}, há um caderno também.`,
      );
    default:
      return build(`これは${w}です。`, `Isto é ${m}.`);
  }
}
