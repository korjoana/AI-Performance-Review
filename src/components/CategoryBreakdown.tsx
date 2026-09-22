import { CATEGORIES } from "../lib/categories";
import type { Entry } from "../lib/types";

interface CategoryBreakdownProps {
  entries: Entry[];
}

export function CategoryBreakdown({ entries }: CategoryBreakdownProps) {
  const counts = CATEGORIES.map((c) => ({
    category: c,
    count: entries.filter((e) => e.category === c.id).length,
  }));
  const max = Math.max(1, ...counts.map((c) => c.count));

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-1)] p-4">
      <h3 className="text-sm font-medium text-[var(--text-primary)]">
        Achievements by competency
      </h3>
      <div className="mt-4 space-y-3">
        {counts.map(({ category, count }) => (
          <div key={category.id} className="flex items-center gap-3">
            <div className="w-44 shrink-0 text-sm text-[var(--text-secondary)]">
              {category.label}
            </div>
            <div className="flex-1 h-2.5 rounded-full bg-[var(--track)]">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${(count / max) * 100}%`,
                  backgroundColor: `var(--cat-${category.id})`,
                  minWidth: count > 0 ? "8px" : "0px",
                }}
              />
            </div>
            <div className="w-6 shrink-0 text-right text-sm tabular-nums text-[var(--text-primary)]">
              {count}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[var(--text-muted)]">
        Colors for reference only — competency names label every row.
      </p>
    </div>
  );
}
