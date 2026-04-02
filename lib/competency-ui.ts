import type { CompetencyAgendaItem } from "@/lib/public-api";

export const competencyDeadlineFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function getCompetencyTone(item: CompetencyAgendaItem) {
  if (item.recommendation_tag) {
    return "primary" as const;
  }

  if (item.scope_tag.toLowerCase() === "internasional") {
    return "green" as const;
  }

  return "sky" as const;
}

export function getCompetencyCountdownLabel(days: number) {
  if (days <= 0) {
    return "Hari ini";
  }

  return `${days} hari lagi`;
}
