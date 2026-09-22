import { StatTile } from "./StatTile";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { EntryForm } from "./EntryForm";
import { EntryList } from "./EntryList";
import type { Entry, Goal } from "../lib/types";

interface DashboardProps {
  entries: Entry[];
  goals: Goal[];
  onAdd: (entry: Entry) => void;
  onDelete: (id: string) => void;
}

function quarterKey(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return `${d.getFullYear()}-Q${Math.floor(d.getMonth() / 3) + 1}`;
}

export function Dashboard({ entries, goals, onAdd, onDelete }: DashboardProps) {
  const now = new Date();
  const currentQuarter = `${now.getFullYear()}-Q${Math.floor(now.getMonth() / 3) + 1}`;
  const thisQuarterCount = entries.filter((e) => quarterKey(e.date) === currentQuarter).length;
  const withImpact = entries.filter((e) => e.impact.trim().length > 0).length;
  const goalsAchieved = goals.filter((g) => g.status === "achieved").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatTile label="Total achievements" value={entries.length} />
        <StatTile label="This quarter" value={thisQuarterCount} hint={currentQuarter} />
        <StatTile label="With measured impact" value={withImpact} />
        <StatTile label="Goals achieved" value={`${goalsAchieved}/${goals.length}`} />
      </div>

      <CategoryBreakdown entries={entries} />

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">
          Recent achievements
        </h2>
        <EntryForm onAdd={onAdd} />
        <EntryList entries={entries} onDelete={onDelete} />
      </div>
    </div>
  );
}
