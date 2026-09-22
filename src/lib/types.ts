export type CategoryId =
  | "technical"
  | "impact"
  | "leadership"
  | "collaboration"
  | "strategic";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}

export interface Entry {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  category: CategoryId;
  description: string;
  impact: string;
  link: string;
  tags: string[];
  createdAt: string;
}

export type GoalStatus = "not_started" | "in_progress" | "achieved";

export interface Goal {
  id: string;
  title: string;
  category: CategoryId;
  targetDate: string;
  status: GoalStatus;
  notes: string;
  createdAt: string;
}

export interface Profile {
  name: string;
  currentTitle: string;
  targetTitle: string;
  manager: string;
  periodStart: string;
  periodEnd: string;
  summary: string;
}
