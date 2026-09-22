import { CATEGORIES, categoryById } from "./categories";
import type { Entry, Goal, Profile } from "./types";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function buildPromotionMarkdown(
  profile: Profile,
  entries: Entry[],
  goals: Goal[],
): string {
  const inPeriod = entries.filter((e) => {
    if (profile.periodStart && e.date < profile.periodStart) return false;
    if (profile.periodEnd && e.date > profile.periodEnd) return false;
    return true;
  });

  const sorted = [...inPeriod].sort((a, b) => a.date.localeCompare(b.date));

  const lines: string[] = [];

  lines.push(`# Promotion Packet: ${profile.name || "Your Name"}`);
  lines.push("");
  lines.push(
    `**${profile.currentTitle || "Current Title"} → ${profile.targetTitle || "Target Title"}**`,
  );
  if (profile.manager) lines.push(`Manager: ${profile.manager}`);
  if (profile.periodStart || profile.periodEnd) {
    lines.push(
      `Review period: ${formatDate(profile.periodStart) || "—"} to ${
        formatDate(profile.periodEnd) || "present"
      }`,
    );
  }
  lines.push("");

  lines.push("## Executive Summary");
  lines.push("");
  lines.push(
    profile.summary ||
      "_Add a 2-3 sentence summary of why this promotion is warranted — scope, impact, and readiness for the next level._",
  );
  lines.push("");

  lines.push("## Key Achievements by Competency");
  lines.push("");
  for (const category of CATEGORIES) {
    const items = sorted.filter((e) => e.category === category.id);
    if (items.length === 0) continue;
    lines.push(`### ${category.label}`);
    lines.push("");
    for (const item of items) {
      lines.push(`- **${item.title}** _(${formatDate(item.date)})_`);
      if (item.description) lines.push(`  ${item.description}`);
      if (item.impact) lines.push(`  - Impact: ${item.impact}`);
      if (item.link) lines.push(`  - Reference: ${item.link}`);
    }
    lines.push("");
  }

  const withImpact = sorted.filter((e) => e.impact.trim().length > 0);
  if (withImpact.length > 0) {
    lines.push("## Impact Highlights");
    lines.push("");
    for (const item of withImpact) {
      lines.push(`- ${item.impact} — _${item.title}_`);
    }
    lines.push("");
  }

  const relevantGoals = goals.filter((g) => g.status !== "not_started");
  if (relevantGoals.length > 0) {
    lines.push("## Growth Trajectory");
    lines.push("");
    for (const g of relevantGoals) {
      const status =
        g.status === "achieved" ? "Achieved" : "In progress";
      lines.push(`- [${status}] ${g.title} (${categoryById(g.category).label})`);
    }
    lines.push("");
  }

  lines.push("## Summary by Competency");
  lines.push("");
  lines.push("| Competency | Achievements logged |");
  lines.push("|---|---|");
  for (const category of CATEGORIES) {
    const count = sorted.filter((e) => e.category === category.id).length;
    lines.push(`| ${category.label} | ${count} |`);
  }
  lines.push("");

  lines.push("---");
  lines.push(
    `_Generated on ${formatDate(new Date().toISOString().slice(0, 10))} from ${
      sorted.length
    } logged achievement${sorted.length === 1 ? "" : "s"}._`,
  );

  return lines.join("\n");
}

export function downloadTextFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
