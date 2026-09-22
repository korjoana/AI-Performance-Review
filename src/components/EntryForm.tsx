import { useState } from "react";
import { v4 as uuid } from "uuid";
import { CATEGORIES } from "../lib/categories";
import type { CategoryId, Entry } from "../lib/types";

interface EntryFormProps {
  onAdd: (entry: Entry) => void;
}

const empty = {
  title: "",
  date: new Date().toISOString().slice(0, 10),
  category: CATEGORIES[0].id as CategoryId,
  description: "",
  impact: "",
  link: "",
  tags: "",
};

export function EntryForm({ onAdd }: EntryFormProps) {
  const [form, setForm] = useState(empty);
  const [open, setOpen] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onAdd({
      id: uuid(),
      title: form.title.trim(),
      date: form.date,
      category: form.category,
      description: form.description.trim(),
      impact: form.impact.trim(),
      link: form.link.trim(),
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    });
    setForm(empty);
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        + Log an achievement
      </button>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-lg border border-[var(--border)] bg-[var(--surface-1)] p-4 space-y-3"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="sm:col-span-2 text-sm text-[var(--text-secondary)]">
          Title
          <input
            autoFocus
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Led migration of billing service"
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
          />
        </label>
        <label className="text-sm text-[var(--text-secondary)]">
          Date
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
          />
        </label>
      </div>

      <label className="block text-sm text-[var(--text-secondary)]">
        Competency
        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value as CategoryId })
          }
          className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm text-[var(--text-secondary)]">
        Description
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="What did you do? What was the scope?"
          rows={2}
          className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
        />
      </label>

      <label className="block text-sm text-[var(--text-secondary)]">
        Impact / result
        <textarea
          value={form.impact}
          onChange={(e) => setForm({ ...form, impact: e.target.value })}
          placeholder="Quantify it where possible — time saved, revenue, reliability, people helped"
          rows={2}
          className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
        />
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="text-sm text-[var(--text-secondary)]">
          Link (doc, PR, dashboard)
          <input
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder="https://..."
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
          />
        </label>
        <label className="text-sm text-[var(--text-secondary)]">
          Tags (comma separated)
          <input
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="architecture, mentorship"
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
          />
        </label>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setForm(empty);
          }}
          className="rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
