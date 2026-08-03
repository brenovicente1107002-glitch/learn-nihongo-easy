import { supabase } from "@/integrations/supabase/client";
import type { SrsCard } from "@/lib/srs";

export type CloudRow = {
  lesson_id: string;
  completed: boolean;
  ease: number;
  interval_days: number;
  reps: number;
  due: string;
  last_review: string | null;
  last_score: number;
};

/** Baixa todo o progresso salvo na conta do usuário. */
export async function baixarProgresso(): Promise<CloudRow[]> {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id, completed, ease, interval_days, reps, due, last_review, last_score");
  if (error) return [];
  return (data ?? []) as CloudRow[];
}

/** Salva (ou atualiza) o progresso de uma lição na conta do usuário. */
export async function salvarProgresso(
  userId: string,
  lessonId: string,
  patch: { completed?: boolean; card?: SrsCard },
) {
  const row = {
    user_id: userId,
    lesson_id: lessonId,
    updated_at: new Date().toISOString(),
    ...(patch.completed !== undefined ? { completed: patch.completed } : {}),
    ...(patch.card
      ? {
          ease: patch.card.ease,
          interval_days: patch.card.interval,
          reps: patch.card.reps,
          due: new Date(patch.card.due).toISOString(),
          last_review: new Date(patch.card.lastReview).toISOString(),
          last_score: patch.card.lastScore,
          xp: Math.round(patch.card.lastScore / 10),
        }
      : {}),
  };
  await supabase.from("lesson_progress").upsert(row, { onConflict: "user_id,lesson_id" });
}

export const rowToCard = (r: CloudRow): SrsCard => ({
  id: r.lesson_id,
  ease: r.ease,
  interval: r.interval_days,
  reps: r.reps,
  due: new Date(r.due).getTime(),
  lastReview: r.last_review ? new Date(r.last_review).getTime() : 0,
  lastScore: r.last_score,
});
