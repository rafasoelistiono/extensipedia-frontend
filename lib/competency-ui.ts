import type { CompetencyAgendaItem } from "@/lib/public-api";

export const competencyDeadlineFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

const appDateFormatter = new Intl.DateTimeFormat("en-CA", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "Asia/Jakarta",
  year: "numeric",
});

export type CompetencyDeadlineParts = {
  dateKey: number;
  month: number;
  year: number;
};

export function getCompetencyTodayDateKey(date = new Date()) {
  const parts = appDateFormatter.formatToParts(date);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    return Number.NaN;
  }

  return Number(`${year}${month}${day}`);
}

export function parseCompetencyDeadlineDate(
  deadlineDate: string,
): CompetencyDeadlineParts | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(deadlineDate);

  if (!match) {
    return null;
  }

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }

  return {
    dateKey: year * 10000 + month * 100 + day,
    month: month - 1,
    year,
  };
}

export function isCompetencyAgendaVisible(
  item: CompetencyAgendaItem,
  todayDateKey = getCompetencyTodayDateKey(),
) {
  const deadline = parseCompetencyDeadlineDate(item.deadline_date);

  if (!deadline || Number.isNaN(todayDateKey)) {
    return true;
  }

  return deadline.dateKey >= todayDateKey;
}

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

export function compareAgendaByNearestDeadline(
  left: CompetencyAgendaItem,
  right: CompetencyAgendaItem,
) {
  const leftDeadline = parseCompetencyDeadlineDate(left.deadline_date);
  const rightDeadline = parseCompetencyDeadlineDate(right.deadline_date);
  const leftSortValue = leftDeadline?.dateKey ?? Number.POSITIVE_INFINITY;
  const rightSortValue = rightDeadline?.dateKey ?? Number.POSITIVE_INFINITY;

  if (leftSortValue !== rightSortValue) {
    return leftSortValue - rightSortValue;
  }

  return left.title.localeCompare(right.title, "id-ID");
}
