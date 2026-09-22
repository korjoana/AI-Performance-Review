import { v4 as uuid } from "uuid";
import type { Entry, Goal } from "./types";

const today = new Date();
const monthsAgo = (n: number) => {
  const d = new Date(today);
  d.setMonth(d.getMonth() - n);
  return d.toISOString().slice(0, 10);
};

export function seedEntries(): Entry[] {
  return [
    {
      id: uuid(),
      title: "Led migration of billing service to the new event-driven pipeline",
      date: monthsAgo(1),
      category: "technical",
      description:
        "Redesigned the billing service around async events, removing the nightly batch job.",
      impact: "Cut billing latency from 24h to under 5 minutes; zero downtime cutover.",
      link: "",
      tags: ["architecture", "backend"],
      createdAt: new Date().toISOString(),
    },
    {
      id: uuid(),
      title: "Owned Q2 checkout reliability initiative",
      date: monthsAgo(3),
      category: "impact",
      description:
        "Identified checkout drop-off root cause, drove fix across 3 teams end-to-end.",
      impact: "Reduced checkout errors by 40%, recovering an estimated $120k/quarter.",
      link: "",
      tags: ["reliability", "revenue"],
      createdAt: new Date().toISOString(),
    },
    {
      id: uuid(),
      title: "Mentored two new-grad engineers to full ramp-up",
      date: monthsAgo(4),
      category: "leadership",
      description:
        "Structured onboarding plan, weekly pairing, and code review guidance for two new hires.",
      impact: "Both engineers shipped independently within 6 weeks, ahead of the 12-week target.",
      link: "",
      tags: ["mentorship"],
      createdAt: new Date().toISOString(),
    },
    {
      id: uuid(),
      title: "Drove alignment between Product and Platform on API contract",
      date: monthsAgo(2),
      category: "collaboration",
      description:
        "Facilitated design reviews across two orgs to settle a long-blocked API disagreement.",
      impact: "Unblocked 3 dependent teams; shipped the shared contract in 2 weeks.",
      link: "",
      tags: ["cross-functional"],
      createdAt: new Date().toISOString(),
    },
    {
      id: uuid(),
      title: "Proposed and scoped the team's next-half technical roadmap",
      date: monthsAgo(1),
      category: "strategic",
      description:
        "Authored a roadmap doc weighing build-vs-buy for the notifications platform.",
      impact: "Adopted as the team's official H2 plan; saved an estimated 2 engineer-quarters.",
      link: "",
      tags: ["planning"],
      createdAt: new Date().toISOString(),
    },
  ];
}

export function seedGoals(): Goal[] {
  return [
    {
      id: uuid(),
      title: "Lead a project spanning 2+ teams end-to-end",
      category: "leadership",
      targetDate: monthsAgo(-3),
      status: "in_progress",
      notes: "Target: the notifications platform rollout.",
      createdAt: new Date().toISOString(),
    },
    {
      id: uuid(),
      title: "Publish a technical design doc reviewed org-wide",
      category: "technical",
      targetDate: monthsAgo(-1),
      status: "not_started",
      notes: "",
      createdAt: new Date().toISOString(),
    },
  ];
}
