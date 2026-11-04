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
  午後: "à tarde", 後: "depois",
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
  食べて: "comer (ligação)",
  飲みます: "bebo",
  行きます: "vou",
  行って: "ir (ligação)",
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
  のが: "(o ato de)", 好きです: "gosto", つもりです: "pretendo", ちょっと: "um pouco",
  ね: "né?", 本当: "verdade", について: "sobre", 話しましょう: "vamos conversar",
  こと: "coisa / assunto", よく: "bastante / muito", 考えます: "penso",
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

/** Conjuntos de palavras com molduras verificadas (evita conjugar traduções). */
const alimentos = new Set(["ご飯", "パン", "肉", "魚", "卵", "果物", "りんご", "リンゴ", "寿司", "すし", "ラーメン", "野菜", "ケーキ"]);
const bebidas = new Set(["水", "お茶", "コーヒー", "牛乳", "ジュース", "ビール", "紅茶"]);
const destinos = new Set(["学校", "駅", "病院", "公園", "図書館", "空港", "ホテル", "銀行", "会社", "大学", "レストラン"]);
const ACOES: Record<string, { jp: string; pt: string; te: string }> = {
  食べる: { jp: "食べます", pt: "como", te: "食べて" },
  飲む: { jp: "飲みます", pt: "bebo", te: "飲んで" },
  行く: { jp: "行きます", pt: "vou", te: "行って" },
  来る: { jp: "来ます", pt: "venho", te: "来て" },
  読む: { jp: "読みます", pt: "leio", te: "読んで" },
  書く: { jp: "書きます", pt: "escrevo", te: "書いて" },
  寝る: { jp: "寝ます", pt: "durmo", te: "寝て" },
  働く: { jp: "働きます", pt: "trabalho", te: "働いて" },
  勉強する: { jp: "勉強します", pt: "estudo", te: "勉強して" },
};

/** Frases graduadas por nível; estruturas seguras evitam conjugar traduções portuguesas. */
export function frase(v: VocabItem, variante = 0): Frase {
  const w = v.word;
  const m = significado(v.meaning);
  const s = hash(w) + variante * 17;
  const contexto = contextos[v.level][s % contextos[v.level].length] ?? contextos.N5[0];
  const prefixo = contexto ?? { jp: ["今日", "は"], pt: "Hoje" };
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
  } else if (ACOES[w]) {
    const acao = ACOES[w];
    alvo = acao.jp;
    corpo = ["私", "は", acao.jp];
    traducao = `eu ${acao.pt}`;
  } else {
    // Molduras do dia a dia que aceitam qualquer item da mesma classe sem flexionar.
    const t = v.type.toLowerCase();
    const k = s % 2;
    if (t.startsWith("verbo") && /[うくぐすつぬぶむる]$/.test(w)) {
      corpo = k ? [w, "のが", "好きです"] : ["明日", "は", w, "つもりです"];
      traducao = k ? `gosto de ${m}` : `amanhã pretendo ${m}`;
    } else if (t.startsWith("adjetivo")) {
      corpo = k ? ["ちょっと", w, "です", "ね"] : ["本当", "に", w, "です", "ね"];
      traducao = k ? `está um pouco ${m}, né?` : `é muito ${m} mesmo, né?`;
    } else if (t.startsWith("substantivo")) {
      corpo = k ? [w, "について", "ちょっと", "話しましょう"] : [w, "の", "こと", "を", "よく", "考えます"];
      traducao = k ? `vamos falar um pouco sobre ${m}` : `penso bastante em ${m}`;
    } else {
      corpo = ["「", w, "」", "って", "よく", "言います", "ね"];
      traducao = `a gente diz muito “${w}”, né?`;
    }
  }
  const tokens = [...prefixo.jp, ...corpo, "。"];
  const jp = tokens.join("");
  const palavras = tokens.filter((t) => !["。", "、", "「", "」"].includes(t))
    .map((t) => ({ jp: t, pt: t === w ? m : (GLOSS[t] ?? "") }));
  return { jp, resposta: alvo, lacuna: jp.replace(alvo, BLANK), pt: [prefixo.pt, traducao].filter(Boolean).join(" ") + ".", tokens, palavras };
}

/**
 * Frase montada só com palavras da própria unidade: combina duas palavras
 * aprendidas juntas (comida + bebida, ação + lugar, palavra + lugar).
 * Retorna null quando a unidade não tem par compatível.
 */
function fraseComUnidade(v: VocabItem, variante: number, unidade: VocabItem[]): Frase | null {
  const outros = unidade.filter((u) => u.word !== v.word);
  if (!outros.length) return null;
  const mapa = new Map<string, string>([
    [v.word, significado(v.meaning)],
    ...outros.map((u): [string, string] => [u.word, significado(u.meaning)]),
  ]);
  const gloss = (t: string) => mapa.get(t) ?? GLOSS[t] ?? "";
  const montar = (tokens: string[], alvoTok: string, pt: string): Frase => {
    const jp = tokens.join("");
    return {
      jp,
      resposta: alvoTok,
      lacuna: jp.replace(alvoTok, BLANK),
      pt,
      tokens,
      palavras: tokens
        .filter((t) => !["。", "、", "「", "」"].includes(t))
        .map((t) => ({ jp: t, pt: gloss(t) })),
    };
  };
  const s = hash(v.word) + variante * 31;
  const vAlimento = alimentos.has(v.word);
  const vBebida = bebidas.has(v.word);
  const vAcao = ACOES[v.word];

  if (vAlimento || vBebida) {
    const parceiro = outros.find((o) => (vAlimento ? bebidas.has(o.word) : alimentos.has(o.word)));
    if (parceiro) {
      const comida = vAlimento ? v.word : parceiro.word;
      const bebida = vAlimento ? parceiro.word : v.word;
      return montar(
        [comida, "を", "食べて", "、", bebida, "を", "飲みます", "。"],
        v.word,
        `Como ${gloss(comida)} e bebo ${gloss(bebida)}.`,
      );
    }
  }
  if (vAcao) {
    const destino = outros.find((o) => destinos.has(o.word));
    if (destino) {
      return montar(
        [destino.word, "へ", "行って", "、", vAcao.jp, "。"],
        vAcao.jp,
        `Vou a ${gloss(destino.word)} e ${vAcao.pt}.`,
      );
    }
    const outra = outros.find((o) => ACOES[o.word]);
    const a2 = outra ? ACOES[outra.word] : undefined;
    if (a2) {
      return montar([vAcao.te, "、", a2.jp, "。"], vAcao.te, `${vAcao.pt} e ${a2.pt}.`);
    }
  }
  // Substantivo comum ou lugar: citação segura dentro de um lugar da unidade.
  const lugar = v.word && destinos.has(v.word) ? v.word : outros.find((o) => destinos.has(o.word))?.word;
  const parceiro = v.word === lugar ? outros[s % outros.length] : v;
  if (lugar && parceiro && parceiro.word !== lugar) {
    return montar(
      ["「", parceiro.word, "」", "は", lugar, "に", "あります", "。"],
      v.word === lugar ? lugar : v.word,
      `${gloss(parceiro.word)} fica em ${gloss(lugar)}.`,
    );
  }
  return null;
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
export function frases(v: VocabItem, n = 3, unidade: VocabItem[] = []): Frase[] {
  const out: Frase[] = [];
  for (let i = 0; out.length < n && i < n * 4; i++) {
    const f = (unidade.length ? fraseComUnidade(v, i, unidade) : null) ?? frase(v, i);
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
