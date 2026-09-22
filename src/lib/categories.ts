import type { Category, CategoryId } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "technical",
    label: "Technical Excellence",
    description: "Engineering quality, architecture, technical depth",
  },
  {
    id: "impact",
    label: "Impact & Ownership",
    description: "Outcomes delivered, scope owned, problems solved end-to-end",
  },
  {
    id: "leadership",
    label: "Leadership & Mentorship",
    description: "Growing others, setting direction, raising the bar",
  },
  {
    id: "collaboration",
    label: "Collaboration & Communication",
    description: "Cross-functional work, influence, clarity in writing/speaking",
  },
  {
    id: "strategic",
    label: "Strategic Thinking",
    description: "Business judgment, prioritization, long-term thinking",
  },
];

// Fixed categorical order per the validated palette (adjacent-pair safe).
export const CATEGORY_COLOR: Record<CategoryId, { light: string; dark: string }> = {
  technical: { light: "#2a78d6", dark: "#3987e5" },
  impact: { light: "#eb6834", dark: "#d95926" },
  leadership: { light: "#1baf7a", dark: "#199e70" },
  collaboration: { light: "#eda100", dark: "#c98500" },
  strategic: { light: "#e87ba4", dark: "#d55181" },
};

export function categoryById(id: CategoryId): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}
