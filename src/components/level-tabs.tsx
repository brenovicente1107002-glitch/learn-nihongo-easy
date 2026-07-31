import { jlptLevels, type JlptLevel } from "@/data/kanji";
import { cn } from "@/lib/utils";

export function LevelTabs({
  value,
  onChange,
  counts,
}: {
  value: JlptLevel;
  onChange: (level: JlptLevel) => void;
  counts?: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {jlptLevels.map((level) => (
        <button
          key={level}
          type="button"
          onClick={() => onChange(level)}
          className={cn(
            "rounded-full border px-4 py-2 font-display text-sm font-semibold transition-colors",
            value === level
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
          )}
        >
          {level}
          {counts?.[level] !== undefined && (
            <span className="ml-2 text-xs opacity-70">{counts[level]}</span>
          )}
        </button>
      ))}
    </div>
  );
}
