import type { Profile } from "../lib/types";

interface ProfileFormProps {
  profile: Profile;
  setProfile: (p: Profile) => void;
}

function field<K extends keyof Profile>(
  profile: Profile,
  setProfile: (p: Profile) => void,
  key: K,
) {
  return {
    value: profile[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setProfile({ ...profile, [key]: e.target.value }),
  };
}

export function ProfileForm({ profile, setProfile }: ProfileFormProps) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-1)] p-4 space-y-3">
      <h3 className="text-sm font-medium text-[var(--text-primary)]">
        Promotion packet details
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="text-sm text-[var(--text-secondary)]">
          Name
          <input
            {...field(profile, setProfile, "name")}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
          />
        </label>
        <label className="text-sm text-[var(--text-secondary)]">
          Manager
          <input
            {...field(profile, setProfile, "manager")}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
          />
        </label>
        <label className="text-sm text-[var(--text-secondary)]">
          Current title
          <input
            {...field(profile, setProfile, "currentTitle")}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
          />
        </label>
        <label className="text-sm text-[var(--text-secondary)]">
          Target title
          <input
            {...field(profile, setProfile, "targetTitle")}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
          />
        </label>
        <label className="text-sm text-[var(--text-secondary)]">
          Review period start
          <input
            type="date"
            {...field(profile, setProfile, "periodStart")}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
          />
        </label>
        <label className="text-sm text-[var(--text-secondary)]">
          Review period end
          <input
            type="date"
            {...field(profile, setProfile, "periodEnd")}
            className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
          />
        </label>
      </div>
      <label className="block text-sm text-[var(--text-secondary)]">
        Executive summary
        <textarea
          {...field(profile, setProfile, "summary")}
          rows={3}
          placeholder="2-3 sentences on why this promotion is warranted"
          className="mt-1 w-full rounded-md border border-[var(--border)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)]"
        />
      </label>
    </div>
  );
}
