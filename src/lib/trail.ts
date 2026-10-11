import type { Licao } from "@/data/licoes";

/** Stable groups retain the original lesson IDs and order. */
export function agruparLicoes(licoes: Licao[]): Licao[][] {
  const grupos: Licao[][] = [];
  for (let i = 0; i < licoes.length; i += 3) grupos.push(licoes.slice(i, i + 3));
  return grupos;
}