import { useCallback, useEffect, useState } from "react";
import { isDue, scheduleCard, type SrsCard } from "@/lib/srs";
import { supabase } from "@/integrations/supabase/client";
import { baixarProgresso, rowToCard, salvarProgresso } from "@/lib/cloud";

const KEY = "nihongo-quest-srs";

type Store = Record<string, SrsCard>;

const read = (): Store => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Store) : {};
  } catch {
    return {};
  }
};

const write = (store: Store) => {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    /* storage indisponível */
  }
};

export function useSrs() {
  const [cards, setCards] = useState<Store>({});
  const [now, setNow] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setCards(read());
    setNow(Date.now());
    const t = window.setInterval(() => setNow(Date.now()), 60_000);

    let alive = true;
    const sync = async (uid: string | null) => {
      if (!alive) return;
      setUserId(uid);
      if (!uid) return;
      const rows = await baixarProgresso();
      if (!alive) return;
      const local = read();
      const merged: Store = { ...local };
      rows.forEach((r) => {
        const remoto = rowToCard(r);
        const atual = merged[r.lesson_id];
        if (!atual || remoto.lastReview >= atual.lastReview) merged[r.lesson_id] = remoto;
      });
      setCards(merged);
      write(merged);
    };

    void supabase.auth.getSession().then(({ data }) => sync(data.session?.user.id ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => void sync(s?.user.id ?? null));

    return () => {
      alive = false;
      window.clearInterval(t);
      sub.subscription.unsubscribe();
    };
  }, []);

  const persist = useCallback((next: Store) => {
    setCards(next);
    write(next);
  }, []);

  /** Registra o desempenho (0–1) de um quiz e reagenda a lição. */
  const review = useCallback(
    (lessonId: string, accuracy: number) => {
      const current = read();
      const updated = scheduleCard(current[lessonId], accuracy);
      updated.id = lessonId;
      persist({ ...current, [lessonId]: updated });
      if (userId) void salvarProgresso(userId, lessonId, { completed: true, card: updated });
      return updated;
    },
    [persist, userId],
  );

  const reset = useCallback(() => persist({}), [persist]);

  const getCard = useCallback((lessonId: string) => cards[lessonId], [cards]);

  const dueIds = Object.values(cards)
    .filter((c) => isDue(c, now || Date.now()))
    .sort((a, b) => a.due - b.due)
    .map((c) => c.id);

  const scheduledCount = Object.keys(cards).length;

  return { cards, dueIds, scheduledCount, review, getCard, reset, now, sincronizado: !!userId };
}
