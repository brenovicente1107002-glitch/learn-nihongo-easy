import { segmentarFurigana, temKanji } from "@/lib/furigana";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  /** desliga a leitura acima dos kanji */
  off?: boolean;
};

/** Texto japonês com furigana (leitura em hiragana) acima dos kanji. */
export function JaText({ text, className, off }: Props) {
  if (off || !temKanji(text)) return <span className={className}>{text}</span>;
  const segs = segmentarFurigana(text);
  return (
    <span className={cn("inline", className)}>
      {segs.map((s, i) =>
        s.ruby ? (
          <ruby key={`${s.text}-${i}`} className="leading-none">
            {s.text}
            <rt className="font-body text-[0.5em] font-normal text-muted-foreground">{s.ruby}</rt>
          </ruby>
        ) : (
          <span key={`${s.text}-${i}`}>{s.text}</span>
        ),
      )}
    </span>
  );
}
