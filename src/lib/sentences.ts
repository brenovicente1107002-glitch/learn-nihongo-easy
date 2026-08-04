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

/**
 * Monta uma frase de contexto para a palavra, para que o vocabulário
 * seja sempre aprendido dentro de uma sentença.
 */
export function frase(v: VocabItem): Frase {
  const w = v.word;
  const m = v.meaning.split(/[;,/]/)[0]?.trim() || v.meaning;

  const build = (tokens: string[], pt: string): Frase => {
    const jp = tokens.join("");
    return { jp, lacuna: jp.replace(w, BLANK), pt, tokens };
  };

  switch (v.type) {
    case "verbo":
      return build(["毎日", w, "。"], `${m} todos os dias.`);
    case "adjetivo":
      return build(["これは", "とても", w, "です", "。"], `Isto é muito ${m}.`);
    case "advérbio":
      return build([w, "わかりました", "。"], `${m}, entendi.`);
    case "saudação":
    case "expressão":
      return build([w, "と", "言いました", "。"], `Disse "${m}".`);
    case "pronome":
      return build([w, "は", "学生", "です", "。"], `${m} é estudante.`);
    case "contador":
      return build([w, "あります", "。"], `Há ${m}.`);
    case "conector":
    case "partícula":
      return build(
        ["これは", "本", "です", "。", w, "、", "ノート", "も", "あります", "。"],
        `Isto é um livro. ${m}, há um caderno também.`,
      );
    default:
      return build(["これは", w, "です", "。"], `Isto é ${m}.`);
  }
}

/** Divide uma frase japonesa em pedaços aproveitáveis para montar a frase. */
export function tokenizarJa(jp: string): string[] {
  const limpo = jp.trim();
  const partes = limpo.match(/[一-龯ヶ]+[ぁ-ん]*|[ァ-ヴー]+|[ぁ-ん]{1,3}|[^\s]/g);
  if (!partes) return [limpo];
  return partes;
}
