import { useMemo } from "react";
import aomaru from "@/assets/aomaru.png";
import aomaruFeliz from "@/assets/aomaru-feliz.png";
import aomaruPensando from "@/assets/aomaru-pensando.png";
import aomaruFalando from "@/assets/aomaru-falando.png";
import aomaruOuvindo from "@/assets/aomaru-ouvindo.png";
import aomaruEscrevendo from "@/assets/aomaru-escrevendo.png";
import { cn } from "@/lib/utils";

/** Expressões disponíveis do Aomaru. */
export const expressoes = {
  neutro: aomaru,
  feliz: aomaruFeliz,
  pensando: aomaruPensando,
  falando: aomaruFalando,
  ouvindo: aomaruOuvindo,
  escrevendo: aomaruEscrevendo,
} as const;

export type Expressao = keyof typeof expressoes;

/** Conselhos do Aomaru, cada um com a expressão que combina com o tema. */
export const conselhos: { texto: string; expressao: Expressao }[] = [
  {
    texto: "Estude pouco todo dia: 10 minutos valem mais que 2 horas no domingo.",
    expressao: "pensando",
  },
  {
    texto: "Leia a frase inteira em voz alta — o ouvido aprende junto com os olhos.",
    expressao: "falando",
  },
  {
    texto: "Não decore a palavra sozinha: guarde ela dentro de uma frase.",
    expressao: "pensando",
  },
  {
    texto: "Errou? Ótimo! O erro é o que faz a revisão espaçada funcionar.",
    expressao: "feliz",
  },
  {
    texto: "Use o furigana só para conferir. Tente ler o kanji antes de olhar.",
    expressao: "pensando",
  },
  {
    texto: "Toque no áudio duas vezes: uma para entender, outra para imitar.",
    expressao: "ouvindo",
  },
  {
    texto: "Partículas (は, が, を, に) mudam tudo. Preste atenção nelas nas frases.",
    expressao: "pensando",
  },
  {
    texto: "Escrever à mão fixa o kanji muito mais rápido do que só reconhecer.",
    expressao: "escrevendo",
  },
  {
    texto: "Revisão de hoje é lição de amanhã: não deixe a fila acumular.",
    expressao: "ouvindo",
  },
  {
    texto: "Fale em japonês mesmo errando — fluência nasce da coragem.",
    expressao: "falando",
  },
];

/** Dica do dia, estável durante o dia inteiro. */
export function conselhoDoDia() {
  const dia = Math.floor(Date.now() / 86_400_000);
  return conselhos[dia % conselhos.length]!;
}

/** Escolhe a expressão automaticamente pelo conteúdo do texto. */
export function expressaoPara(texto: string): Expressao {
  const t = texto.toLowerCase();
  if (/áudio|escut|ouv/.test(t)) return "ouvindo";
  if (/voz alta|fale|falar|imitar|pronunc/.test(t)) return "falando";
  if (/escrev|à mão|traço/.test(t)) return "escrevendo";
  if (/erro|errou|acert|parabéns|ótimo|mandou bem/.test(t)) return "feliz";
  if (/pense|lembre|decore|atenção|tente/.test(t)) return "pensando";
  return "neutro";
}

type Props = {
  /** texto do conselho; por padrão usa o conselho do dia */
  texto?: string;
  /** expressão do mascote; por padrão é detectada pelo texto */
  expressao?: Expressao;
  className?: string;
  size?: "sm" | "md";
};

/** Balão de fala com o Aomaru dando um conselho de estudo. */
export function AomaruTip({ texto, expressao, className, size = "md" }: Props) {
  const conselho = useMemo(
    () => (texto ? { texto, expressao: expressao ?? expressaoPara(texto) } : conselhoDoDia()),
    [texto, expressao],
  );
  const dim = size === "sm" ? "h-12 w-12" : "h-20 w-20";

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-4",
        className,
      )}
    >
      <img
        src={expressoes[conselho.expressao]}
        alt={`Aomaru, o mascote (${conselho.expressao})`}
        loading="lazy"
        width={816}
        height={816}
        className={cn("shrink-0 object-contain drop-shadow-sm", dim)}
      />
      <div className="relative rounded-xl bg-card px-4 py-3 text-sm text-card-foreground shadow-sm">
        <span className="absolute top-1/2 -left-1.5 h-3 w-3 -translate-y-1/2 rotate-45 bg-card" />
        <span className="relative font-medium text-primary">Aomaru diz: </span>
        <span className="relative">{conselho.texto}</span>
      </div>
    </div>
  );
}

/** Apenas a figura do mascote, na expressão desejada. */
export function AomaruAvatar({
  className,
  expressao = "neutro",
}: {
  className?: string;
  expressao?: Expressao;
}) {
  return (
    <img
      src={expressoes[expressao]}
      alt="Aomaru"
      loading="lazy"
      width={816}
      height={816}
      className={cn("object-contain", className)}
    />
  );
}
