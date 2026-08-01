import { useCallback, useEffect, useState } from "react";

const KEY = "nihongo-quest-progress";

const read = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};

export function useProgress() {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    setDone(read());
  }, []);

  const persist = useCallback((next: string[]) => {
    setDone(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage indisponível */
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      const current = read();
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      persist(next);
    },
    [persist],
  );

  const complete = useCallback(
    (id: string) => {
      const current = read();
      if (!current.includes(id)) persist([...current, id]);
    },
    [persist],
  );

  return { done, toggle, complete, isDone: (id: string) => done.includes(id) };
}
