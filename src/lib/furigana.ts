import { vocabulario } from "@/data/vocabulario";
const KANJI = /[\u4e00-\u9faf\u3005]/;
export type RubySeg = { text: string; ruby?: string };
let dic: Map<string, string> | undefined;
let maxLen = 1;
const extras: Record<string, string> = {
  私: "わたし", 言葉: "ことば", 使います: "つかいます",
  食べます: "たべます", 飲みます: "のみます", 行きます: "いきます", 来ます: "きます",
  読みます: "よみます", 書きます: "かきます", 寝ます: "ねます", 働きます: "はたらきます",
  勉強します: "べんきょうします", 終わって: "おわって", 終わった: "おわった", 帰って: "かえって",
  時間: "じかん", 今: "いま", 忙しい: "いそがしい", 仕事: "しごと", 予定: "よてい",
  変わった: "かわった", 限られている: "かぎられている", 踏まえ: "ふまえ",
  相談した: "そうだんした", 上で: "うえで", 生活: "せいかつ", 保つ: "たもつ",
  中: "なか", 見直した: "みなおした", 入口: "いりぐち", 出口: "でぐち",
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


/** Match kana anchors exactly; only kanji runs receive annotations. */
export function alinharLeitura(word: string, reading: string): RubySeg[] {
  const runs = word.match(/[一-龯々]+|[^一-龯々]+/g) ?? [];
  const align = (index: number, cursor: number): RubySeg[] | undefined => {
    const run = runs[index];
    if (!run) return cursor === reading.length ? [] : undefined;
    if (!KANJI.test(run)) {
      if (!reading.startsWith(run, cursor)) return undefined;
      const rest = align(index + 1, cursor + run.length);
      return rest ? [{ text: run }, ...rest] : undefined;
    }
    for (let end = cursor + 1; end <= reading.length; end++) {
      const rest = align(index + 1, end);
      if (rest) return [{ text: run, ruby: reading.slice(cursor, end) }, ...rest];
    }
    return undefined;
  };
  return align(0, 0) ?? [{ text: word }];
}

export function segmentarFurigana(texto: string): RubySeg[] {
  if (!dic) {
    dic = new Map();
    for (const v of vocabulario) {
      if (KANJI.test(v.word) && /^[ぁ-んー]+$/.test(v.reading) && !dic.has(v.word)) dic.set(v.word, v.reading);
    }
    for (const [word, reading] of Object.entries(extras)) dic.set(word, reading);
    maxLen = Math.max(1, ...Array.from(dic.keys(), (w) => w.length));
  }
  const dictionary = dic;
  const result: RubySeg[] = [];
  for (let i = 0; i < texto.length;) {
    let matched = false;
    // Match words starting in kana too (e.g. お祝い), not just kanji.
    for (let length = Math.min(maxLen, texto.length - i); length >= 1; length--) {
      const word = texto.slice(i, i + length);
      const reading = dictionary.get(word);
      if (!reading) continue;
      // Never guess a compound reading from its individual characters.
      if (/^[一-龯々]+$/.test(word) && KANJI.test(texto[i + length] ?? "")) continue;
      result.push(...alinharLeitura(word, reading));
      i += length;
      matched = true;
      break;
    }
    if (!matched) {
      result.push({ text: texto[i] ?? "" });
      i += 1;
    }
  }
  return result;
}
export const temKanji = (texto: string) => KANJI.test(texto);
