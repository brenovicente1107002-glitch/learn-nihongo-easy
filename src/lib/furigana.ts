import { kanji } from "@/data/kanji";
import { vocabulario } from "@/data/vocabulario";

const KANJI = /[\u4e00-\u9faf\u3005]/;

export type RubySeg = { text: string; ruby?: string };

let dic: Map<string, string> | null = null;
let charDic: Map<string, string> | null = null;
let maxLen = 1;

/** Palavras extras que aparecem nas frases geradas. */
const extras: Record<string, string> = {
  毎日: "まいにち",
  学生: "がくせい",
  本: "ほん",
  言いました: "いいました",
  言う: "いう",
  食べる: "たべる",
  飲む: "のむ",
  行く: "いく",
  今日: "きょう",
  明日: "あした",
  先生: "せんせい",
  日本語: "にほんご",
  友達: "ともだち",
};

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
    const r = k.readings.find((x) => /^[ぁ-ん]+$/.test(x)) ?? k.readings[0];
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
        push(trecho, leitura);
        i += len;
        achou = true;
        break;
      }
    }
    if (achou) continue;
    const uni = dic!.get(ch) ?? charDic!.get(ch);
    push(ch, uni);
    i += 1;
  }
  return segs;
}

export const temKanji = (texto: string) => KANJI.test(texto);
