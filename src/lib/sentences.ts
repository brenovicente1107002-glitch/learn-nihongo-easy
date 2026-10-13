import type { VocabItem } from "@/data/vocabulario";

export type Frase = {
  /** frase completa em japonês */
  jp: string;
  /** Surface form expected in the gap, including conjugation. */
  resposta: string;
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



/** Significado de cada pedacinho usado nas frases (partículas, verbos, complementos). */
const GLOSS: Record<string, string> = {
  休憩: "intervalo / descanso", 私: "eu", 言葉: "palavra", という: "chamada", 使います: "uso",
  読みます: "leio", 書きます: "escrevo", 来ます: "venho", 働きます: "trabalho", 勉強します: "estudo",
  終わって: "terminar (ligação)", 終わった: "terminou", 帰って: "voltar (ligação)",
  する: "fazer", 前に: "antes de", 時間: "tempo", ある: "há / ter", 今: "agora",
  忙しい: "ocupado", ため: "porque", 仕事: "trabalho", にもかかわらず: "apesar de",
  予定: "planos", 変わった: "mudaram", ものの: "embora", 限られている: "é limitado",
  とはいえ: "embora", こと: "fato", 踏まえ: "levando em conta", 相談した: "conversei / consultei",
  上で: "depois de", 生活: "vida cotidiana", リズム: "ritmo", 保つ: "manter", べく: "para / a fim de",
  中: "em meio a", 見直した: "reavaliei",
  は: "(tópico)",
  が: "(sujeito)",
  を: "(objeto)",
  に: "em / para",
  へ: "para",
  と: "com / que",
  で: "em / de",
  の: "de",
  も: "também",
  から: "a partir de / depois de",
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

/** Escolha determinística: a mesma palavra gera sempre a mesma frase. */
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}


/** Primeiro sentido da palavra, sem parênteses nem notas, para caber na frase. */
function significado(meaning: string): string {
  const primeiro = (meaning.split(/[;,/]/)[0] ?? meaning).trim() || meaning;
  return primeiro.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
}

/** Frases graduadas por nível; estruturas seguras evitam conjugar traduções portuguesas. */
export function frase(v: VocabItem, variante = 0): Frase {
  const w = v.word;
  const m = significado(v.meaning);
  const s = hash(w) + variante * 17;
  const contexto = contextos[v.level][s % contextos[v.level].length] ?? contextos.N5[0];
  const prefixo = contexto ?? { jp: ["今日", "は"], pt: "Hoje" };
  const alimentos = new Set(["ご飯", "パン", "肉", "魚", "卵", "果物", "りんご", "リンゴ", "寿司", "すし", "ラーメン", "野菜", "ケーキ"]);
  const bebidas = new Set(["水", "お茶", "コーヒー", "牛乳", "ジュース", "ビール", "紅茶"]);
  const destinos = new Set(["学校", "駅", "病院", "公園", "図書館", "空港", "ホテル", "銀行", "会社", "大学", "レストラン"]);
  const acoes: Record<string, { jp: string; pt: string }> = {
    食べる: { jp: "食べます", pt: "como" }, 飲む: { jp: "飲みます", pt: "bebo" },
    行く: { jp: "行きます", pt: "vou" }, 来る: { jp: "来ます", pt: "venho" },
    読む: { jp: "読みます", pt: "leio" }, 書く: { jp: "書きます", pt: "escrevo" },
    寝る: { jp: "寝ます", pt: "durmo" }, 働く: { jp: "働きます", pt: "trabalho" },
    勉強する: { jp: "勉強します", pt: "estudo" },
  };
  let corpo: string[];
  let traducao: string;
  let alvo = w;
  if (alimentos.has(w)) {
    corpo = [w, "を", "食べます"];
    traducao = `como ${m}`;
  } else if (bebidas.has(w)) {
    corpo = [w, "を", "飲みます"];
    traducao = `bebo ${m}`;
  } else if (destinos.has(w)) {
    corpo = [w, "へ", "行きます"];
    traducao = `vou para ${m}`;
  } else if (acoes[w]) {
    const acao = acoes[w];
    alvo = acao.jp;
    corpo = ["私", "は", acao.jp];
    traducao = `eu ${acao.pt}`;
  } else {
    // A citação permite praticar qualquer classe sem inventar usos ou flexões.
    corpo = ["「", w, "」", "を", "使います"];
    traducao = `uso “${w}”`;
  }
  const tokens = [...prefixo.jp, ...corpo, "。"];
  const jp = tokens.join("");
  const palavras = tokens.filter((t) => !["。", "、", "「", "」"].includes(t))
    .map((t) => ({ jp: t, pt: t === w ? m : (GLOSS[t] ?? "") }));
  return { jp, resposta: alvo, lacuna: jp.replace(alvo, BLANK), pt: `${prefixo.pt} ${traducao}.`, tokens, palavras };
}

/** Complexidade crescente: tempo → sequência → motivo → concessão → ponderação. */
const contextos: Record<VocabItem["level"], Comp[]> = {
  N5: [
    { jp: ["今日", "は"], pt: "Hoje" },
    { jp: ["毎朝"], pt: "Toda manhã" },
    { jp: [], pt: "" },
  ],
  N4: [
    { jp: ["午後", "は"], pt: "À tarde" },
    { jp: ["夜", "は"], pt: "À noite" },
    { jp: ["週末", "に"], pt: "No fim de semana" },
  ],
  N3: [
    { jp: ["授業", "の", "後", "で", "、"], pt: "Depois da aula" },
    { jp: ["週末", "は", "忙しい", "ので", "、"], pt: "Como o fim de semana está ocupado" },
  ],
  N2: [
    { jp: ["仕事", "が", "終わって", "から", "、"], pt: "Depois que o trabalho termina" },
    { jp: ["時間", "が", "ある", "ので", "、"], pt: "Como tenho tempo" },
  ],
  N1: [
    { jp: ["予定", "が", "変わった", "ので", "、"], pt: "Como os planos mudaram" },
    { jp: ["時間", "が", "限られている", "ので", "、"], pt: "Como o tempo é limitado" },
  ],
};

/** Divide uma frase japonesa em pedaços aproveitáveis para montar a frase. */
export function tokenizarJa(jp: string): string[] {
  const limpo = jp.trim();
  const partes = limpo.match(/[一-龯ヶ]+[ぁ-ん]*|[ァ-ヴー]+|[ぁ-ん]{1,3}|[^\s]/g);
  if (!partes) return [limpo];
  return partes;
}

/** Várias frases diferentes com a mesma palavra (para revisar a unidade). */
export function frases(v: VocabItem, n = 3): Frase[] {
  const out: Frase[] = [];
  for (let i = 0; out.length < n && i < n * 4; i++) {
    const f = frase(v, i);
    if (!out.some((o) => o.jp === f.jp)) out.push(f);
  }
  return out;
}

/** Explicação curta "palavra = sentido" de tudo o que aparece na frase. */
export function glossario(f: Frase): string {
  return f.palavras
    .filter((p) => p.pt)
    .map((p) => `${p.jp} = ${p.pt}`)
    .join("  ·  ");
}
