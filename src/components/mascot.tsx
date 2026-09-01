import { useMemo } from "react";
import aomaru from "@/assets/aomaru.png";
import { cn } from "@/lib/utils";

/** Conselhos do Aomaru, o mascote do app. */
export const conselhos = [
  "Estude pouco todo dia: 10 minutos valem mais que 2 horas no domingo.",
  "Leia a frase inteira em voz alta — o ouvido aprende junto com os olhos.",
  "Não decore a palavra sozinha: guarde ela dentro de uma frase.",
  "Errou? Ótimo! O erro é o que faz a revisão espaçada funcionar.",
  "Use o furigana só para conferir. Tente ler o kanji antes de olhar.",
  "Toque no áudio duas vezes: uma para entender, outra para imitar.",
  "Partículas (は, が, を, に) mudam tudo. Preste atenção nelas nas frases.",
  "Escrever à mão fixa o kanji muito mais rápido do que só reconhecer.",
  "Revisão de hoje é lição de amanhã: não deixe a fila acumular.",
  "Fale em japonês mesmo errando — fluência nasce da coragem.",
];

/** Dica do dia, estável durante o dia inteiro. */
export function conselhoDoDia() {
  const dia = Math.floor(Date.now() / 86_400_000);
  return conselhos[dia % conselhos.length]!;
}

type Props = {
  /** texto do conselho; por padrão usa o conselho do dia */
  texto?: string;
  className?: string;
  size?: "sm" | "md";
};

/** Balão de fala com o Aomaru dando um conselho de estudo. */
export function AomaruTip({ texto, className, size = "md" }: Props) {
  const msg = useMemo(() => texto ?? conselhoDoDia(), [texto]);
  const dim = size === "sm" ? "h-12 w-12" : "h-20 w-20";

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4",
        className,
      )}
    >
      <img
        src={aomaru}
        alt="Aomaru, o mascote"
        loading="lazy"
        width={816}
        height={816}
        className={cn("shrink-0 object-contain drop-shadow-sm", dim)}
      />
      <div className="relative rounded-xl bg-card px-4 py-3 text-sm text-card-foreground shadow-sm">
        <span className="absolute top-1/2 -left-1.5 h-3 w-3 -translate-y-1/2 rotate-45 bg-card" />
        <span className="relative font-medium text-primary">Aomaru diz: </span>
        <span className="relative">{msg}</span>
      </div>
    </div>
  );
}

/** Apenas a figura do mascote. */
export function AomaruAvatar({ className }: { className?: string }) {
  return (
    <img
      src={aomaru}
      alt="Aomaru"
      loading="lazy"
      width={816}
      height={816}
      className={cn("object-contain", className)}
    />
  );
}
