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
  /** explicação palavra por palavra */
  palavras: { jp: string; pt: string }[];
};

const BLANK = "＿＿＿";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Significado de cada pedacinho usado nas frases (partículas, verbos, complementos). */
const GLOSS: Record<string, string> = {
  は: "(tópico)",
  が: "(sujeito)",
  を: "(objeto)",
  に: "em / para",
  へ: "para",
  と: "com / que",
  で: "em / de",
  の: "de",
  も: "também",
  から: "depois de",
  ので: "porque",
  て: "",
  食べます: "como",
  飲みます: "bebo",
  行きます: "vou",
  話します: "converso",
  話しました: "conversei",
  言います: "digo",
  言いました: "disse",
  言って: "dizendo",
  買いました: "comprei",
  勉強: "estudo",
  します: "faço",
  います: "há (ser vivo)",
  あります: "há (coisa)",
  見ました: "vi",
  寝ます: "durmo",
  帰りました: "fui embora",
  遅れた: "me atrasei",
  多い: "muito / frequente",
  です: "é / está",
  とても: "muito",
  新しい: "novo",
  これ: "isto",
  この: "este",
  あの: "aquele",
  あそこ: "ali",
  本: "livro",
  ノート: "caderno",
  店: "loja",
  かばん: "bolsa",
  日本語: "japonês",
  授業: "aula",
  話: "assunto",
  毎朝: "toda manhã",
  今日: "hoje",
  明日: "amanhã",
  週末: "fim de semana",
  夜: "noite",
  家: "casa",
  学校: "escola",
  公園: "parque",
  駅: "estação",
  前: "frente",
  会社: "empresa",
  友達: "amigo",
  家族: "família",
  先生: "professor",
  一人: "sozinho",
  挨拶: "saudação",
  会: "encontrar",
  って: "(citação)",
  学生: "estudante",
  "、": ",",
  "。": ".",
};

/** Complementos simples (1–2 palavras) que entram em algumas frases. */
type Comp = { jp: string[]; pt: string };

const tempos: Comp[] = [
  { jp: ["毎朝"], pt: "toda manhã" },
  { jp: ["今日", "は"], pt: "hoje" },
  { jp: ["明日", "は"], pt: "amanhã" },
  { jp: ["夜", "に"], pt: "à noite" },
];

const lugares: Comp[] = [
  { jp: ["家", "で"], pt: "em casa" },
  { jp: ["学校", "で"], pt: "na escola" },
  { jp: ["公園", "で"], pt: "no parque" },
];

const pessoas: Comp[] = [
  { jp: ["友達", "と"], pt: "com um amigo" },
  { jp: ["家族", "と"], pt: "com a família" },
  { jp: ["一人", "で"], pt: "sozinho" },
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

/** Primeiro sentido da palavra, sem parênteses nem notas, para caber na frase. */
function significado(meaning: string): string {
  const primeiro = (meaning.split(/[;,/]/)[0] ?? meaning).trim() || meaning;
  return primeiro.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Monta uma frase curta (cerca de 5 palavras) com contexto adequado ao sentido
 * da palavra, acompanhada da explicação palavra por palavra.
 */
export function frase(v: VocabItem): Frase {
  const w = v.word;
  const m = significado(v.meaning);
  const s = hash(w);

  const build = (tokens: string[], pt: string): Frase => {
    const jp = tokens.join("");
    const palavras = tokens
      .filter((t) => t !== "。" && t !== "、")
      .map((t) => ({ jp: t, pt: t === w ? m : (GLOSS[t] ?? "") }));
    return { jp, lacuna: jp.replace(w, BLANK), pt, tokens, palavras };
  };

  const tempo = pick(tempos, s);
  const lugar = pick(lugares, s, 1);
  const pessoa = pick(pessoas, s, 2);

  // 1) frases guiadas pelo sentido da palavra
  switch (tema(m)) {
    case "agradecer":
      return build([w, "と", "言います", "。"], `Eu digo "${m}".`);
    case "desculpa":
      return build(["遅れた", "ので", w, "と", "言いました", "。"], `Como me atrasei, disse "${m}".`);
    case "saudacaoManha":
      return build(["毎朝", w, "と", "言います", "。"], `Toda manhã digo "${m}".`);
    case "saudacaoNoite":
      return build(["夜", w, "と", "言って", "寝ます", "。"], `À noite digo "${m}" e vou dormir.`);
    case "despedida":
      return build([w, "と", "言って", "帰りました", "。"], `Disse "${m}" e fui embora.`);
    case "comida":
      return s % 2 === 0
        ? build([...tempo.jp, w, "を", "食べます", "。"], `${cap(tempo.pt)} como ${m}.`)
        : build([w, "を", "食べます", "。"], `Como ${m}.`);
    case "bebida":
      return s % 2 === 0
        ? build([...tempo.jp, w, "を", "飲みます", "。"], `${cap(tempo.pt)} bebo ${m}.`)
        : build([w, "を", "飲みます", "。"], `Bebo ${m}.`);
    case "lugar":
      return s % 2 === 0
        ? build([...pessoa.jp, w, "へ", "行きます", "。"], `Vou ${pessoa.pt} para ${m}.`)
        : build([w, "へ", "行きます", "。"], `Vou para ${m}.`);
    case "pessoa":
      return build([w, "と", "話します", "。"], `Converso com ${m}.`);
    case "transporte":
      return build([w, "で", "行きます", "。"], `Vou de ${m}.`);
    case "tempoClima":
      return build(["今日", "は", w, "です", "。"], `Hoje está com ${m}.`);
    case "roupa":
      return build(["新しい", w, "を", "買いました", "。"], `Comprei ${m} novo(a).`);
    case "estudo":
      return build([w, "で", "勉強", "します", "。"], `Estudo com ${m}.`);
    case "animal":
      return build([...lugar.jp, w, "が", "います", "。"], `Há ${m} ${lugar.pt}.`);
    case "sentimento":
      return build(["とても", w, "です", "。"], `Estou muito ${m}.`);
    case "trabalho":
      return build([w, "の", "話", "を", "しました", "。"], `Falei sobre ${m}.`);
    default:
      break;
  }

  // 2) sem tema claro: usa a classe gramatical
  switch (v.type) {
    case "verbo":
      return s % 2 === 0
        ? build([...tempo.jp, w, "。"], `${cap(tempo.pt)} eu ${m}.`)
        : build([w, "。"], `Eu ${m}.`);
    case "adjetivo":
      return build(["これ", "は", "とても", w, "です", "。"], `Isto é muito ${m}.`);
    case "advérbio":
      return build(["日本語", "を", w, "勉強", "します", "。"], `Eu estudo japonês ${m}.`);
    case "saudação":
    case "expressão":
      return build([w, "と", "言いました", "。"], `Eu disse "${m}".`);
    case "pronome":
      return build([w, "は", "学生", "です", "。"], `${cap(m)} é estudante.`);
    case "contador":
      return build([w, "あります", "。"], `Há ${m}.`);
    case "conector":
    case "partícula":
      return build(
        ["これ", "は", "本", "です", "。", w, "、", "ノート", "も", "あります", "。"],
        `Isto é um livro. ${cap(m)}, também há um caderno.`,
      );
    default:
      return build([w, "を", "見ました", "。"], `Eu vi ${m}.`);
  }
}

/** Divide uma frase japonesa em pedaços aproveitáveis para montar a frase. */
export function tokenizarJa(jp: string): string[] {
  const limpo = jp.trim();
  const partes = limpo.match(/[一-龯ヶ]+[ぁ-ん]*|[ァ-ヴー]+|[ぁ-ん]{1,3}|[^\s]/g);
  if (!partes) return [limpo];
  return partes;
}
