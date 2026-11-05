export type Nuance = { palavras: { jp: string; uso: string }[]; explicacao: string };

/** Pares formal/informal e palavras de mesmo sentido, com a diferença de uso. */
export const NUANCES: Nuance[] = [
  { palavras: [{ jp: "食べます", uso: "formal" }, { jp: "食べる", uso: "informal" }], explicacao: "-masu é educado (estranhos, trabalho); forma de dicionário é para amigos e família." },
  { palavras: [{ jp: "飲みます", uso: "formal" }, { jp: "飲む", uso: "informal" }], explicacao: "Mesma regra: ます com desconhecidos, forma simples entre amigos." },
  { palavras: [{ jp: "行きます", uso: "formal" }, { jp: "行く", uso: "informal" }], explicacao: "行きます em situações educadas; 行く na conversa casual." },
  { palavras: [{ jp: "です", uso: "formal" }, { jp: "だ", uso: "informal" }], explicacao: "です é a cópula educada; だ é casual e soa firme." },
  { palavras: [{ jp: "ありがとうございます", uso: "formal" }, { jp: "ありがとう", uso: "informal" }], explicacao: "Use a versão longa com professores e clientes." },
  { palavras: [{ jp: "どうもありがとうございます", uso: "muito formal" }, { jp: "ありがとうございました", uso: "formal, por algo já feito" }, { jp: "どうも", uso: "casual, rápido" }], explicacao: "Os 'obrigados': ございます agradece algo atual; ございました agradece algo que já terminou (ao sair da loja); どうも sozinho é um 'valeu' leve." },
  { palavras: [{ jp: "こんばんは", uso: "boa noite ao chegar" }, { jp: "お休みなさい", uso: "boa noite ao ir dormir" }], explicacao: "こんばんは (konbanwa) é cumprimento ao encontrar alguém à noite. お休みなさい (oyasuminasai) é despedida antes de dormir; entre amigos basta おやすみ." },
  { palavras: [{ jp: "すみません", uso: "formal" }, { jp: "ごめん", uso: "informal" }], explicacao: "すみません pede desculpas ou chama atenção educadamente; ごめん é entre amigos." },
  { palavras: [{ jp: "私", uso: "neutro/formal" }, { jp: "僕", uso: "casual (masc.)" }, { jp: "俺", uso: "bem casual (masc.)" }], explicacao: "Todos significam 'eu'; mudam o tom e a imagem de quem fala." },
  { palavras: [{ jp: "あなた", uso: "distante" }, { jp: "君", uso: "casual" }], explicacao: "Japoneses evitam 'você': prefira o nome da pessoa + さん." },
  { palavras: [{ jp: "はい", uso: "formal" }, { jp: "うん", uso: "informal" }], explicacao: "Ambos são 'sim'; うん só com pessoas próximas." },
  { palavras: [{ jp: "見る", uso: "ver/olhar" }, { jp: "観る", uso: "assistir (filme, show)" }], explicacao: "Mesma leitura みる; 観る é para espetáculos." },
  { palavras: [{ jp: "言う", uso: "dizer algo" }, { jp: "話す", uso: "conversar, falar uma língua" }], explicacao: "言う cita palavras; 話す é o ato de conversar." },
  { palavras: [{ jp: "知る", uso: "saber, conhecer" }, { jp: "分かる", uso: "entender" }], explicacao: "分かる é compreender algo; 知る é ter a informação." },
  { palavras: [{ jp: "家", uso: "casa (prédio)" }, { jp: "うち", uso: "meu lar, minha família" }], explicacao: "家 é a construção; うち tem sentido afetivo de 'nossa casa'." },
  { palavras: [{ jp: "美味しい", uso: "gostoso (neutro)" }, { jp: "うまい", uso: "gostoso (casual, masc.)" }], explicacao: "美味しい serve sempre; うまい é coloquial." },
  { palavras: [{ jp: "始める", uso: "começar algo (transitivo)" }, { jp: "始まる", uso: "algo começa (intransitivo)" }], explicacao: "授業を始める (eu começo a aula) × 授業が始まる (a aula começa)." },
  { palavras: [{ jp: "上手", uso: "habilidoso (elogio a outros)" }, { jp: "得意", uso: "ponto forte (pode falar de si)" }], explicacao: "Dizer 'sou 上手' soa convencido; use 得意." },
];

const DICAS: [RegExp, string][] = [
  [/ありがとう|どうも/, "Para agradecer algo que já acabou, use ありがとうございました."],
  [/こんばんは/, "こんばんは é para cumprimentar à noite; para ir dormir diga お休みなさい."],
  [/お?休みなさい|おやすみ/, "お休みなさい é só para despedida antes de dormir."],
  [/のが好き/, "Verbo + のが好きです = 'gosto de fazer…'. Entre amigos: 〜のが好き."],
  [/つもり/, "つもり indica intenção planejada; é mais firme que 〜たい (quero)."],
  [/ですね|ますね|ね$/, "ね no fim busca concordância, como o 'né?' do português."],
  [/について/, "について = 'sobre, a respeito de'. Comum em conversas e e-mails."],
  [/ましょう/, "〜ましょう é um convite educado: 'vamos…'. Casual: 〜よう."],
  [/て、/, "A forma て liga ações em sequência: 'faço X e depois Y'."],
  [/ので/, "ので dá motivo de forma suave e educada; から é mais direto."],
  [/ます|です/, "です/ます = forma educada. Com amigos, use a forma simples (だ, forma de dicionário)."],
];

export function dicaFrase(jp: string): string | null {
  for (const [re, dica] of DICAS) if (re.test(jp)) return dica;
  return null;
}

export function nuancesPara(palavras: string[]): Nuance[] {
  return NUANCES.filter((n) =>
    n.palavras.some((p) => palavras.some((w) => w === p.jp || w.includes(p.jp) || p.jp.includes(w))),
  );
}
