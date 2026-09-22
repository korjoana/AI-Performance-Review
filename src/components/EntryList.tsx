import { categoryById } from "../lib/categories";
import type { Entry } from "../lib/types";

interface EntryListProps {
  entries: Entry[];
  onDelete: (id: string) => void;
}

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export function EntryList({ entries, onDelete }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <p className="text-sm text-[var(--text-muted)] py-6 text-center">
        No achievements logged yet.
      </p>
    );
  }

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <ul className="divide-y divide-[var(--border)]">
      {sorted.map((entry) => {
        const category = categoryById(entry.category);
        return (
          <li key={entry.id} className="py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
                    style={{ backgroundColor: `var(--cat-${category.id})` }}
                  >
                    {category.label}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">
                    {formatDate(entry.date)}
                  </span>
                </div>
                <h4 className="mt-1 font-medium text-[var(--text-primary)]">{entry.title}</h4>
                {entry.description && (
                  <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
                    {entry.description}
                  </p>
                )}
                {entry.impact && (
                  <p className="mt-0.5 text-sm text-[var(--text-primary)]">
                    <span className="text-[var(--text-secondary)]">Impact: </span>
                    {entry.impact}
                  </p>
                )}
                {entry.tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {entry.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-[var(--track)] px-1.5 py-0.5 text-xs text-[var(--text-secondary)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {entry.link && (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-xs text-[var(--accent)] underline"
                  >
                    Reference link
                  </a>
                )}
              </div>
              <button
                onClick={() => onDelete(entry.id)}
                className="shrink-0 text-xs text-[var(--text-muted)] hover:text-[var(--danger)]"
                aria-label={`Delete ${entry.title}`}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
