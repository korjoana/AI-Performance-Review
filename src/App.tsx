import { useState } from "react";
import { useLocalStorage } from "./lib/storage";
import { seedEntries, seedGoals } from "./lib/seed";
import type { Entry, Goal, Profile } from "./lib/types";
import { Dashboard } from "./components/Dashboard";
import { Goals } from "./components/Goals";
import { PromotionDocument } from "./components/PromotionDocument";
import { DataControls } from "./components/DataControls";

type Tab = "dashboard" | "goals" | "document" | "data";

const EMPTY_PROFILE: Profile = {
  name: "",
  currentTitle: "",
  targetTitle: "",
  manager: "",
  periodStart: "",
  periodEnd: "",
  summary: "",
};

const TABS: { id: Tab; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "goals", label: "Goals" },
  { id: "document", label: "Promotion document" },
  { id: "data", label: "Data" },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [entries, setEntries] = useLocalStorage<Entry[]>("apr.entries", []);
  const [goals, setGoals] = useLocalStorage<Goal[]>("apr.goals", []);
  const [profile, setProfile] = useLocalStorage<Profile>("apr.profile", EMPTY_PROFILE);
  const [seeded, setSeeded] = useLocalStorage<boolean>("apr.seeded", false);

  function addEntry(entry: Entry) {
    setEntries([...entries, entry]);
  }

  function deleteEntry(id: string) {
    setEntries(entries.filter((e) => e.id !== id));
  }

  function loadExample() {
    setEntries([...entries, ...seedEntries()]);
    setGoals([...goals, ...seedGoals()]);
    setSeeded(true);
  }

  return (
    <div className="min-h-screen bg-[var(--page)]">
      <header className="border-b border-[var(--border)] bg-[var(--surface-1)] print:hidden">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[var(--text-primary)]">
              Performance Tracker
            </h1>
            <p className="text-xs text-[var(--text-muted)]">
              Track achievements, watch progress, build your promotion case.
            </p>
          </div>
          {entries.length === 0 && !seeded && (
            <button
              onClick={loadExample}
              className="rounded-md border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-secondary)]"
            >
              Load example data
            </button>
          )}
        </div>
        <nav className="mx-auto max-w-4xl px-4 flex gap-1 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium ${
                tab === t.id
                  ? "border-[var(--accent)] text-[var(--text-primary)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {tab === "dashboard" && (
          <Dashboard entries={entries} goals={goals} onAdd={addEntry} onDelete={deleteEntry} />
        )}
        {tab === "goals" && <Goals goals={goals} setGoals={setGoals} />}
        {tab === "document" && (
          <PromotionDocument
            profile={profile}
            setProfile={setProfile}
            entries={entries}
            goals={goals}
          />
        )}
        {tab === "data" && (
          <DataControls
            entries={entries}
            goals={goals}
            profile={profile}
            onImport={(data) => {
              setEntries(data.entries);
              setGoals(data.goals);
              setProfile(data.profile);
            }}
          />
        )}
      </main>
    </div>
  );
}
