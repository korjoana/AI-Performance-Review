import { useMemo, useState } from "react";
import { ProfileForm } from "./Profile";
import { buildPromotionMarkdown, downloadTextFile } from "../lib/promotionDoc";
import type { Entry, Goal, Profile } from "../lib/types";

interface PromotionDocumentProps {
  profile: Profile;
  setProfile: (p: Profile) => void;
  entries: Entry[];
  goals: Goal[];
}

export function PromotionDocument({
  profile,
  setProfile,
  entries,
  goals,
}: PromotionDocumentProps) {
  const [copied, setCopied] = useState(false);
  const markdown = useMemo(
    () => buildPromotionMarkdown(profile, entries, goals),
    [profile, entries, goals],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — user can still select/copy manually
    }
  }

  function downloadMarkdown() {
    downloadTextFile(
      `promotion-packet-${profile.name || "draft"}.md`.replace(/\s+/g, "-"),
      markdown,
      "text/markdown",
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        Promotion document
      </h2>
      <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
        Builds a promotion packet from your logged achievements and goals, grouped
        by competency. Fill in the details below, then export or print it.
      </p>

      <ProfileForm profile={profile} setProfile={setProfile} />

      <div className="flex flex-wrap gap-2 print:hidden">
        <button
          onClick={downloadMarkdown}
          className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Download Markdown
        </button>
        <button
          onClick={copy}
          className="rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)]"
        >
          {copied ? "Copied!" : "Copy to clipboard"}
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-md border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)]"
        >
          Print / Save as PDF
        </button>
      </div>

      <div
        id="promotion-doc-preview"
        className="rounded-lg border border-[var(--border)] bg-[var(--surface-1)] p-6 print:border-none print:p-0"
      >
        <pre className="whitespace-pre-wrap font-sans text-sm text-[var(--text-primary)] leading-relaxed">
          {markdown}
        </pre>
      </div>
    </div>
  );
}
