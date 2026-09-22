import { useRef } from "react";
import { downloadTextFile } from "../lib/promotionDoc";
import type { Entry, Goal, Profile } from "../lib/types";

interface Backup {
  entries: Entry[];
  goals: Goal[];
  profile: Profile;
}

interface DataControlsProps extends Backup {
  onImport: (data: Backup) => void;
}

export function DataControls({ entries, goals, profile, onImport }: DataControlsProps) {
  const fileInput = useRef<HTMLInputElement>(null);

  function exportData() {
    const payload: Backup = { entries, goals, profile };
    downloadTextFile(
      `performance-review-backup-${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify(payload, null, 2),
      "application/json",
    );
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as Backup;
        if (!Array.isArray(data.entries) || !Array.isArray(data.goals)) {
          throw new Error("Invalid backup file");
        }
        onImport(data);
      } catch {
        alert("Couldn't read that file — is it a backup exported from this app?");
      } finally {
        if (fileInput.current) fileInput.current.value = "";
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-1)] p-4 space-y-2">
      <h3 className="text-sm font-medium text-[var(--text-primary)]">Your data</h3>
      <p className="text-sm text-[var(--text-secondary)]">
        Everything is stored locally in this browser. Export a backup periodically,
        or move your data to another device.
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          onClick={exportData}
          className="rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)]"
        >
          Export backup (.json)
        </button>
        <button
          onClick={() => fileInput.current?.click()}
          className="rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)]"
        >
          Import backup
        </button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json"
          onChange={handleFile}
          className="hidden"
        />
      </div>
    </div>
  );
}
