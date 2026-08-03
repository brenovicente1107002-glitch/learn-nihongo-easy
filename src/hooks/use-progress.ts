import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { baixarProgresso, salvarProgresso } from "@/lib/cloud";

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
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setDone(read());
    let alive = true;

    const sync = async (uid: string | null) => {
      if (!alive) return;
      setUserId(uid);
      if (!uid) return;
      const rows = await baixarProgresso();
      if (!alive) return;
      const local = read();
      const remote = rows.filter((r) => r.completed).map((r) => r.lesson_id);
      const merged = Array.from(new Set([...local, ...remote]));
      setDone(merged);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(merged));
      } catch {
        /* storage indisponível */
      }
      // envia o que só existe local
      await Promise.all(
        local
          .filter((id) => !remote.includes(id))
          .map((id) => salvarProgresso(uid, id, { completed: true })),
      );
    };

    void supabase.auth.getSession().then(({ data }) => sync(data.session?.user.id ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => void sync(s?.user.id ?? null));
    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
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
      const incluido = current.includes(id);
      const next = incluido ? current.filter((x) => x !== id) : [...current, id];
      persist(next);
      if (userId) void salvarProgresso(userId, id, { completed: !incluido });
    },
    [persist, userId],
  );

  const complete = useCallback(
    (id: string) => {
      const current = read();
      if (!current.includes(id)) persist([...current, id]);
      if (userId) void salvarProgresso(userId, id, { completed: true });
    },
    [persist, userId],
  );

  return {
    done,
    toggle,
    complete,
    isDone: (id: string) => done.includes(id),
    sincronizado: !!userId,
  };
}
