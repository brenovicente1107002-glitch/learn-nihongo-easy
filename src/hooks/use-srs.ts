import { useCallback, useEffect, useState } from "react";
import { isDue, scheduleCard, type SrsCard } from "@/lib/srs";

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

export function useSrs() {
  const [cards, setCards] = useState<Store>({});
  const [now, setNow] = useState(0);

  useEffect(() => {
    setCards(read());
    setNow(Date.now());
    const t = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(t);
  }, []);

  const persist = useCallback((next: Store) => {
    setCards(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage indisponível */
    }
  }, []);

  /** Registra o desempenho (0–1) de um quiz e reagenda a lição. */
  const review = useCallback(
    (lessonId: string, accuracy: number) => {
      const current = read();
      const updated = scheduleCard(current[lessonId], accuracy);
      updated.id = lessonId;
      persist({ ...current, [lessonId]: updated });
      return updated;
    },
    [persist],
  );

  const reset = useCallback(() => persist({}), [persist]);

  const getCard = useCallback((lessonId: string) => cards[lessonId], [cards]);

  const dueIds = Object.values(cards)
    .filter((c) => isDue(c, now || Date.now()))
    .sort((a, b) => a.due - b.due)
    .map((c) => c.id);

  const scheduledCount = Object.keys(cards).length;

  return { cards, dueIds, scheduledCount, review, getCard, reset, now };
}
