import { kanji } from "@/data/kanji";
import { vocabulario } from "@/data/vocabulario";

const KANJI = /[\u4e00-\u9faf\u3005]/;
const KANA = /[ぁ-んー]/;

export type RubySeg = { text: string; ruby?: string };

let dic: Map<string, string> | null = null;
let charDic: Map<string, string> | null = null;
let maxLen = 1;

/** Palavras extras que aparecem nas frases geradas. */
const extras: Record<string, string> = {
  毎日: "まいにち",
  毎朝: "まいあさ",
  今日: "きょう",
  明日: "あした",
  週末: "しゅうまつ",
  夜: "よる",
  家: "いえ",
  学校: "がっこう",
  公園: "こうえん",
  駅: "えき",
  前: "まえ",
  会社: "かいしゃ",
  友達: "ともだち",
  家族: "かぞく",
  先生: "せんせい",
  一人: "ひとり",
  本: "ほん",
  店: "みせ",
  新しい: "あたらしい",
  日本語: "にほんご",
  授業: "じゅぎょう",
  勉強: "べんきょう",
  学生: "がくせい",
  言いました: "いいました",
  言う: "いう",
  見ました: "みました",
  見る: "みる",
  食べる: "たべる",
  飲む: "のむ",
  行く: "いく",
  来る: "くる",
  話す: "はなす",
  読む: "よむ",
  書く: "かく",
};

/** Normaliza leituras vindas da base (remove pontos, romaji e parênteses). */
function limparLeitura(r: string | undefined): string | undefined {
  if (!r) return undefined;
  const base = r.split(".")[0]!.replace(/[^ぁ-んー]/g, "");
  return base || undefined;
}

function build() {
  if (dic) return;
  const m = new Map<string, string>();
  for (const v of vocabulario) {
    if (!v.reading || !KANJI.test(v.word) || v.word === v.reading) continue;
    if (!m.has(v.word)) m.set(v.word, v.reading);
    if (v.word.length > maxLen) maxLen = v.word.length;
  }
  for (const [k, r] of Object.entries(extras)) {
    m.set(k, r);
    if (k.length > maxLen) maxLen = k.length;
  }
  const c = new Map<string, string>();
  for (const k of kanji) {
    const r = k.readings.map(limparLeitura).find(Boolean);
    if (r) c.set(k.char, r);
  }
  dic = m;
  charDic = c;
}

/** Quebra o texto japonês em segmentos com leitura (furigana) sobre os kanji. */
export function segmentarFurigana(texto: string): RubySeg[] {
  build();
  const segs: RubySeg[] = [];
  const push = (text: string, ruby?: string) => {
    const last = segs[segs.length - 1];
    if (!ruby && last && !last.ruby) last.text += text;
    else segs.push(ruby ? { text, ruby } : { text });
  };

  /**
   * Coloca o furigana só sobre a parte em kanji: 新しい → 新(あたら)しい.
   */
  const pushPalavra = (trecho: string, leitura: string) => {
    let cauda = 0;
    while (
      cauda < trecho.length - 1 &&
      KANA.test(trecho[trecho.length - 1 - cauda]!) &&
      leitura[leitura.length - 1 - cauda] === trecho[trecho.length - 1 - cauda]
    ) {
      cauda += 1;
    }
    let inicio = 0;
    while (
      inicio < trecho.length - cauda - 1 &&
      KANA.test(trecho[inicio]!) &&
      leitura[inicio] === trecho[inicio]
    ) {
      inicio += 1;
    }
    const nucleo = trecho.slice(inicio, trecho.length - cauda);
    const leituraNucleo = leitura.slice(inicio, leitura.length - cauda);
    if (inicio > 0) push(trecho.slice(0, inicio));
    if (nucleo && leituraNucleo) push(nucleo, leituraNucleo);
    else push(nucleo);
    if (cauda > 0) push(trecho.slice(trecho.length - cauda));
  };

  let i = 0;
  while (i < texto.length) {
    const ch = texto[i]!;
    if (!KANJI.test(ch)) {
      push(ch);
      i += 1;
      continue;
    }
    let achou = false;
    for (let len = Math.min(maxLen, texto.length - i); len >= 2; len--) {
      const trecho = texto.slice(i, i + len);
      const leitura = dic!.get(trecho);
      if (leitura) {
        pushPalavra(trecho, leitura);
        i += len;
        achou = true;
        break;
      }
    }
    if (achou) continue;
    const uni = limparLeitura(dic!.get(ch) ?? charDic!.get(ch));
    push(ch, uni);
    i += 1;
  }
  return segs;
}

export const temKanji = (texto: string) => KANJI.test(texto);
