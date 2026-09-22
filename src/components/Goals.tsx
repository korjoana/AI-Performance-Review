import { useState } from "react";
import { v4 as uuid } from "uuid";
import { CATEGORIES, categoryById } from "../lib/categories";
import type { CategoryId, Goal, GoalStatus } from "../lib/types";

interface GoalsProps {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
}

const STATUS_LABEL: Record<GoalStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  achieved: "Achieved",
};

export function Goals({ goals, setGoals }: GoalsProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CategoryId>(CATEGORIES[0].id);
  const [targetDate, setTargetDate] = useState("");
  const [notes, setNotes] = useState("");

  function addGoal(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setGoals([
      ...goals,
      {
        id: uuid(),
        title: title.trim(),
        category,
        targetDate,
        status: "not_started",
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setTitle("");
    setTargetDate("");
    setNotes("");
    setOpen(false);
  }

  function updateStatus(id: string, status: GoalStatus) {
    setGoals(goals.map((g) => (g.id === id ? { ...g, status } : g)));
  }

  function remove(id: string) {
    setGoals(goals.filter((g) => g.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          Promotion goals
        </h2>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            + Add goal
          </button>
        )}
      </div>

      {open && (
        <form
          onSubmit={addGoal}
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-1)] p-4 space-y-3"
        >
          <label className="block text-sm text-[var(--text-secondary)]">
            Goal
            <input
              autoFocus
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Lead a project spanning 2+ teams"
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="text-sm text-[var(--text-secondary)]">
              Competency
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId)}
                className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-[var(--text-secondary)]">
              Target date
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
              />
            </label>
          </div>
          <label className="block text-sm text-[var(--text-secondary)]">
            Notes
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
            />
          </label>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {goals.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)] py-6 text-center">
          No goals yet — add the milestones you need to hit for your next level.
        </p>
      ) : (
        <ul className="space-y-2">
          {goals.map((g) => (
            <li
              key={g.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface-1)] p-3 flex items-start justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-white"
                    style={{ backgroundColor: `var(--cat-${g.category})` }}
                  >
                    {categoryById(g.category).label}
                  </span>
                  {g.targetDate && (
                    <span className="text-xs text-[var(--text-muted)]">
                      Target: {g.targetDate}
                    </span>
                  )}
                </div>
                <h4 className="mt-1 font-medium text-[var(--text-primary)]">{g.title}</h4>
                {g.notes && (
                  <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{g.notes}</p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <select
                  value={g.status}
                  onChange={(e) => updateStatus(g.id, e.target.value as GoalStatus)}
                  className="rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-2 py-1 text-xs text-[var(--text-primary)]"
                >
                  {(Object.keys(STATUS_LABEL) as GoalStatus[]).map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => remove(g.id)}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--danger)]"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
