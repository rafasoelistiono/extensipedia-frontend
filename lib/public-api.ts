const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://203.194.113.185";

type RequestOptions = RequestInit;

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export type CompetencyAgendaApiResponse = {
  success: boolean;
  message: string;
  data: {
    items: Array<{
      id: string;
      title: string;
      short_description: string;
      urgency_tag: boolean;
      recommendation_tag: boolean;
      category_tag: string;
      scope_tag: string;
      pricing_tag: string;
      deadline_date: string;
      registration_link: string;
      google_calendar_link: string;
      countdown_days: number;
    }>;
    pagination: {
      count: number;
      next: string | null;
      previous: string | null;
      page: number;
      page_size: number;
      total_pages: number;
    };
  };
};

export async function getCompetencyAgendas() {
  return request<CompetencyAgendaApiResponse>(
    "/api/v1/public/competency/agenda-cards/",
  );
}

export type AcademicYoutubeApiResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    description: string;
    embed_url: string;
  };
};

export async function getAcademicYoutube() {
  return request<AcademicYoutubeApiResponse>(
    "/api/v1/public/academic/youtube/",
  );
}

export type AcademicCountdownsApiResponse = {
  success: boolean;
  message: string;
  data: {
    items: Array<{
      id: string;
      title: string;
      target_datetime: string;
      display_order: number;
    }>;
    pagination: {
      count: number;
      next: string | null;
      previous: string | null;
      page: number;
      page_size: number;
      total_pages: number;
    };
  };
};

export async function getAcademicCountdowns() {
  return request<AcademicCountdownsApiResponse>(
    "/api/v1/public/academic/countdown-events/",
  );
}

export type CabinetCalendarApiResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    title: string;
    description: string;
    embed_url: string;
    embed_code: string;
    provider: string;
  };
};

export async function getCabinetCalendar() {
  return request<CabinetCalendarApiResponse>(
    "/api/v1/public/about/cabinet-calendar/",
  );
}

export type FeaturedAspiration = {
  id: string;
  title: string;
  description: string;
  user: string;
  featured?: boolean;
  evidenceImage?: string;
};

export const fallbackFeaturedAspirations: FeaturedAspiration[] = [
  {
    id: "fallback-1",
    title: "Perspiciatis esse molestiae vel qui.",
    description:
      "Quasi quo sit suscipit tempora aperiam rerum placeat id. Voluptatem praesentium excepturi id. Repudiandae incidunt doloremque. Error est et ullam.",
    user: "Anonim",
  },
  {
    id: "fallback-2",
    title: "Perspiciatis esse molestiae vel qui.",
    description:
      "Quasi quo sit suscipit tempora aperiam rerum placeat id. Voluptatem praesentium excepturi id. Repudiandae incidunt doloremque. Error est et ullam.",
    user: "Dimasukkan oleh : Lorem Ipsum",
  },
  {
    id: "fallback-3",
    title: "Perspiciatis esse molestiae vel qui.",
    description:
      "Quasi quo sit suscipit tempora aperiam rerum placeat id. Voluptatem praesentium excepturi id. Repudiandae incidunt doloremque. Error est et ullam.",
    user: "Anonim",
  },
  {
    id: "fallback-4",
    title: "Perspiciatis esse molestiae vel qui.",
    description:
      "Quasi quo sit suscipit tempora aperiam rerum placeat id. Voluptatem praesentium excepturi id. Repudiandae incidunt doloremque. Error est et ullam.",
    user: "Dimasukkan oleh : Lorem Ipsum",
    featured: true,
    evidenceImage: "/hero-campus.jpg",
  },
];

type FeaturedAspirationApiResponse = {
  success: boolean;
  message: string;
  data: unknown;
};

function normalizeFeaturedAspirations(data: unknown): FeaturedAspiration[] {
  const source = Array.isArray(data)
    ? data
    : typeof data === "object" && data !== null
      ? Array.isArray((data as { items?: unknown[] }).items)
        ? (data as { items: unknown[] }).items
        : Array.isArray((data as { results?: unknown[] }).results)
          ? (data as { results: unknown[] }).results
          : []
      : [];

  const normalized: FeaturedAspiration[] = [];

  source.forEach((item, index) => {
    if (typeof item !== "object" || item === null) {
      return;
    }

    const record = item as Record<string, unknown>;
    const title =
      (typeof record.title === "string" && record.title) ||
      (typeof record.subject === "string" && record.subject) ||
      (typeof record.name === "string" && record.name) ||
      "";
    const description =
      (typeof record.description === "string" && record.description) ||
      (typeof record.content === "string" && record.content) ||
      (typeof record.message === "string" && record.message) ||
      "";
    const user =
      (typeof record.user === "string" && record.user) ||
      (typeof record.submitter_name === "string" && record.submitter_name) ||
      (typeof record.author === "string" && record.author) ||
      "Anonim";
    const evidenceImage =
      (typeof record.evidence_image === "string" && record.evidence_image) ||
      (typeof record.image === "string" && record.image) ||
      (typeof record.proof_url === "string" && record.proof_url) ||
      undefined;

    if (!title || !description) {
      return;
    }

    normalized.push({
      id:
        (typeof record.id === "string" && record.id) ||
        (typeof record.id === "number" ? String(record.id) : `featured-${index}`),
      title,
      description,
      user,
      featured: Boolean(evidenceImage),
      evidenceImage,
    });
  });

  return normalized;
}

export async function getFeaturedAspirations() {
  const response = await request<FeaturedAspirationApiResponse>(
    "/api/v1/public/aspirations/featured/",
  );

  return normalizeFeaturedAspirations(response.data);
}

export { BASE_URL };
