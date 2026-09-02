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

/** Palavras-chave em português que revelam o "assunto" da palavra. */
const temas: { nome: string; re: RegExp }[] = [
  { nome: "agradecer", re: /\b(obrigad|agradec|grat)/i },
  { nome: "desculpa", re: /\b(desculp|perd(ã|a)o|sinto muito|licen(ç|c)a)/i },
  { nome: "saudacaoManha", re: /\b(bom dia|bons dias)/i },
  { nome: "saudacaoNoite", re: /\b(boa noite|boa tarde)/i },
  { nome: "despedida", re: /\b(tchau|adeus|at(é|e) (logo|mais)|despedid)/i },
  { nome: "comida", re: /\b(comida|arroz|p(ã|a)o|carne|peixe|sopa|macarr(ã|a)o|bolo|fruta|ma(ç|c)(ã|a)|legume|ovo|doce|refei(ç|c)(ã|a)o|almo(ç|c)o|jantar|caf(é|e) da manh(ã|a)|curry|sushi|ramen)\b/i },
  { nome: "bebida", re: /\b(bebida|(á|a)gua|ch(á|a)\b|caf(é|e)|leite|suco|cerveja|sak(ê|e)|vinho)\b/i },
  { nome: "lugar", re: /\b(loja|escola|esta(ç|c)(ã|a)o|hospital|banco|parque|cidade|casa|biblioteca|restaurante|mercado|universidade|escrit(ó|o)rio|templo|aeroporto|hotel|sala|quarto|rua|pa(í|i)s|montanha|rio|mar|praia)\b/i },
  { nome: "pessoa", re: /\b(pessoa|amigo|professor|aluno|estudante|crian(ç|c)a|m(ã|a)e|pai|irm(ã|a)o|irm(ã|a)|fam(í|i)lia|m(é|e)dico|colega|vizinho|homem|mulher|senhor)\b/i },
  { nome: "transporte", re: /\b(carro|trem|(ô|o)nibus|bicicleta|avi(ã|a)o|navio|metr(ô|o)|t(á|a)xi)\b/i },
  { nome: "tempoClima", re: /\b(chuva|neve|vento|sol|tempo|clima|nublado|calor|frio)\b/i },
  { nome: "roupa", re: /\b(roupa|camisa|sapato|cal(ç|c)a|casaco|chap(é|e)u|vestido|quimono|meia)\b/i },
  { nome: "estudo", re: /\b(livro|caderno|aula|prova|li(ç|c)(ã|a)o|dicion(á|a)rio|palavra|kanji|estudo|l(á|a)pis|caneta|papel)\b/i },
  { nome: "animal", re: /\b(cachorro|gato|p(á|a)ssaro|animal|peixe|cavalo|vaca|coelho)\b/i },
  { nome: "sentimento", re: /\b(feliz|triste|alegr|medo|raiva|saudade|amor|cansa|preocupa|sentimento)\b/i },
  { nome: "trabalho", re: /\b(trabalho|emprego|empresa|reuni(ã|a)o|dinheiro|pre(ç|c)o|cliente|chefe)\b/i },
];

const tema = (m: string): string => temas.find((t) => t.re.test(m))?.nome ?? "";

/**
 * Monta uma frase de contexto adequada ao sentido da palavra: comidas aparecem
 * sendo comidas, lugares sendo visitados, saudações sendo ditas, e assim por diante.
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

  // 1) frases guiadas pelo sentido da palavra
  switch (tema(m)) {
    case "agradecer":
      return build(
        [...pessoa.jp, ...lugar.jp, "会", "って", w, "と", "言います", "。"],
        `Encontro ${pessoa.pt} ${lugar.pt} e digo "${m}".`,
      );
    case "desculpa":
      return build(
        ["遅れた", "ので", ...pessoa.jp, w, "と", "言いました", "。"],
        `Como me atrasei, disse "${m}" ${pessoa.pt}.`,
      );
    case "saudacaoManha":
      return build(
        ["毎朝", ...lugar.jp, ...pessoa.jp, w, "と", "挨拶", "します", "。"],
        `Toda manhã cumprimento ${pessoa.pt} ${lugar.pt} dizendo "${m}".`,
      );
    case "saudacaoNoite":
      return build(
        ["夜", ...lugar.jp, w, "と", "言って", "から", "寝ます", "。"],
        `À noite, ${lugar.pt}, digo "${m}" antes de dormir.`,
      );
    case "despedida":
      return build(
        [...lugar.jp, ...pessoa.jp, w, "と", "言って", "帰りました", "。"],
        `${cap(lugar.pt)} disse "${m}" ${pessoa.pt} e fui embora.`,
      );
    case "comida":
      return build(
        [...tempo.jp, ...lugar.jp, ...pessoa.jp, w, "を", "食べます", "。"],
        `${cap(tempo.pt)} como ${m} ${lugar.pt} ${pessoa.pt}.`,
      );
    case "bebida":
      return build(
        [...tempo.jp, ...lugar.jp, w, "を", "飲みます", "。"],
        `${cap(tempo.pt)} bebo ${m} ${lugar.pt}.`,
      );
    case "lugar":
      return build(
        [...tempo.jp, ...pessoa.jp, w, "へ", "行きます", "。"],
        `${cap(tempo.pt)} vou ${pessoa.pt} para ${m}.`,
      );
    case "pessoa":
      return build(
        [...tempo.jp, ...lugar.jp, w, "と", "話しました", "。"],
        `${cap(tempo.pt)} conversei com ${m} ${lugar.pt}.`,
      );
    case "transporte":
      return build(
        [...tempo.jp, w, "で", ...lugar.jp.slice(0, -1), "へ", "行きます", "。"],
        `${cap(tempo.pt)} vou de ${m} ${lugar.pt}.`,
      );
    case "tempoClima":
      return build(
        [...tempo.jp, ...lugar.jp, w, "が", "多い", "です", "。"],
        `${cap(tempo.pt)} tem muito ${m} ${lugar.pt}.`,
      );
    case "roupa":
      return build(
        [...tempo.jp, "新しい", w, "を", "買いました", "。"],
        `${cap(tempo.pt)} comprei ${m} novo.`,
      );
    case "estudo":
      return build(
        [...tempo.jp, ...lugar.jp, w, "で", "日本語", "を", "勉強", "します", "。"],
        `${cap(tempo.pt)} estudo japonês ${lugar.pt} com ${m}.`,
      );
    case "animal":
      return build(
        [...lugar.jp, w, "が", "います", "。"],
        `${cap(lugar.pt)} há ${m}.`,
      );
    case "sentimento":
      return build(
        [...tempo.jp, ...pessoa.jp, "いて", "とても", w, "です", "。"],
        `${cap(tempo.pt)} estou muito ${m} ${pessoa.pt}.`,
      );
    case "trabalho":
      return build(
        [...tempo.jp, ...lugar.jp, w, "の", "話", "を", "しました", "。"],
        `${cap(tempo.pt)} falei sobre ${m} ${lugar.pt}.`,
      );
    default:
      break;
  }

  // 2) sem tema claro: usa a classe gramatical
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
