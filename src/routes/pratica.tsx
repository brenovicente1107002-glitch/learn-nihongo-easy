import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DrawCanvas } from "@/components/draw-canvas";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { hiragana, katakana } from "@/data/kana";
import { kanji, jlptLevels, type JlptLevel } from "@/data/kanji";
import { speakJa } from "@/lib/tts";

export const Route = createFileRoute("/pratica")({
  head: () => ({
    meta: [
      { title: "Prática de escrita — Nihongo Quest" },
      { name: "description", content: "Pratique hiragana, katakana e kanji desenhando na ordem certa dos traços." },
      { property: "og:title", content: "Prática de escrita — Nihongo Quest" },
      { property: "og:description", content: "Desenhe kana e kanji com guia de traços e leituras on'yomi e kun'yomi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Pratica,
});

type Modo = "hiragana" | "katakana" | "kanji";

/** on'yomi (leitura chinesa) vem em katakana; kun'yomi (japonesa) em hiragana. */
function separarLeituras(readings: string[]) {
  const on = readings.filter((r) => /^[\u30a0-\u30ff.\-ー]+$/.test(r));
  const kun = readings.filter((r) => !on.includes(r));
  return { on, kun };
}

function Pratica() {
  const [modo, setModo] = useState<Modo>("hiragana");
  const [nivel, setNivel] = useState<JlptLevel>("N5");
  const [i, setI] = useState(0);

  const lista = useMemo(() => {
    if (modo === "hiragana") return hiragana.map((k) => ({ char: k.char, sub: k.romaji }));
    if (modo === "katakana") return katakana.map((k) => ({ char: k.char, sub: k.romaji }));
    return kanji.filter((k) => k.level === nivel).map((k) => ({ char: k.char, sub: k.meaning, readings: k.readings }));
  }, [modo, nivel]);

  const item = lista[i % Math.max(lista.length, 1)];
  const leituras = item && "readings" in item && item.readings ? separarLeituras(item.readings) : null;

  const trocar = (m: Modo) => {
    setModo(m);
    setI(0);
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="font-display text-2xl font-bold">Prática de escrita</h1>
      <div className="flex gap-2">
        {(["hiragana", "katakana", "kanji"] as Modo[]).map((m) => (
          <Button key={m} size="sm" variant={modo === m ? "default" : "outline"} onClick={() => trocar(m)} className="capitalize">
            {m}
          </Button>
        ))}
      </div>
      {modo === "kanji" && (
        <div className="flex flex-wrap gap-2">
          {jlptLevels.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setNivel(n);
                setI(0);
              }}
              className={cn(
                "rounded-full border px-3 py-1 text-sm",
                nivel === n ? "border-primary bg-primary/10 text-primary" : "border-border",
              )}
            >
              {n}
            </button>
          ))}
        </div>
      )}

      {item && (
        <Card key={`${modo}-${item.char}`} className="slide-up">
          <CardContent className="space-y-4 pt-6">
            <div className="flex items-center justify-between">
              <button type="button" onClick={() => speakJa(item.char)} className="font-display text-5xl font-bold">
                {item.char}
              </button>
              <div className="text-right">
                <div className="font-medium">{item.sub}</div>
                <div className="text-xs text-muted-foreground">
                  {(i % lista.length) + 1} / {lista.length}
                </div>
              </div>
            </div>

            {leituras && (
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl bg-muted p-3">
                  <div className="text-xs font-semibold text-primary">On'yomi (leitura chinesa)</div>
                  <div className="font-display text-base">{leituras.on.join("・") || "—"}</div>
                </div>
                <div className="rounded-xl bg-muted p-3">
                  <div className="text-xs font-semibold text-primary">Kun'yomi (leitura japonesa)</div>
                  <div className="font-display text-base">{leituras.kun.join("・") || "—"}</div>
                </div>
              </div>
            )}

            <DrawCanvas char={item.char} resetKey={`${modo}-${i}`} />

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setI((x) => (x - 1 + lista.length) % lista.length)}>
                Anterior
              </Button>
              <Button onClick={() => setI((x) => (x + 1) % lista.length)}>Próximo</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
