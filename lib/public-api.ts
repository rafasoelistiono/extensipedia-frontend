const DEFAULT_API_ORIGIN = "http://127.0.0.1:8000";

function normalizeApiOrigin(value: string) {
  return value
    .trim()
    .replace(/\/api\/v1\/?$/i, "")
    .replace(/\/$/, "");
}

const BASE_URL = normalizeApiOrigin(
  process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_ORIGIN,
);

const DEFAULT_PUBLIC_REVALIDATE_SECONDS = 300;
const DEFAULT_PUBLIC_TIMEOUT_MS = 650;
const MUTATION_TIMEOUT_MS = 10_000;

type RequestOptions = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
  timeoutMs?: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type Paginated<T> = {
  items: T[];
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
    page: number;
    page_size: number;
    total_pages: number;
  };
};

export type AcademicCountdown = {
  id: string;
  title: string;
  target_datetime: string;
  display_order: number;
};

export type AcademicService = {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string | null;
  published_at: string | null;
};

export type AcademicQuickDownload = {
  id: string;
  title: string;
  resource_type: "file" | "external_link";
  resource_url: string;
  display_order: number;
};

export type AcademicRepositoryMaterial = {
  id: string;
  title: string;
  google_drive_link: string;
  display_order: number;
};

export type AcademicYoutubeSection = {
  id: string;
  title: string;
  description: string;
  embed_url: string;
};

export type AcademicDigitalResources = Record<string, unknown>;

export type CompetencyAgendaItem = {
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
  team_finding_link: string;
  google_calendar_link: string;
  countdown_days: number;
};

export type CompetencyWinnerSlide = {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  updated_at: string;
};

export type CareerResources = {
  id: string;
  cv_templates: string;
  cover_letter: string;
  portfolio_guide: string;
  salary_script: string;
  case_study_interview_prep: string;
};

export type CareerOpportunity = {
  id: string;
  title: string;
  organization: string;
  description: string;
  apply_url: string | null;
  closes_at: string | null;
};

export type AdvocacyPolicyResources = Record<string, unknown>;

export type FeaturedAspiration = {
  id: string;
  ticket_id: string;
  title: string;
  short_description: string;
  visibility: "public" | "anonymous" | string;
  sender_name: string | null;
  status: string;
  upvote_count: number;
  vote_count: number;
  created_at: string;
};

export type TicketTracking = {
  ticket_id: string | null;
  title: string | null;
  status: string | null;
  submitted_at: string | null;
  updated_at: string | null;
  visibility: string | null;
  short_description: string | null;
};

function buildApiUrl(
  path: string,
  query?: Record<string, string | number | boolean | undefined | null>,
) {
  const url = new URL(`${BASE_URL}${path}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        return;
      }

      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
}

export async function request<T>(
  path: string,
  options: RequestOptions = {},
  query?: Record<string, string | number | boolean | undefined | null>,
): Promise<T> {
  const { timeoutMs, ...fetchOptions } = options;
  const cacheMode = fetchOptions.cache ?? "force-cache";
  const shouldUseNextCache = cacheMode !== "no-store";

  const response = await fetch(buildApiUrl(path, query), {
    ...fetchOptions,
    cache: cacheMode,
    next: shouldUseNextCache
      ? (fetchOptions.next ?? { revalidate: DEFAULT_PUBLIC_REVALIDATE_SECONDS })
      : undefined,
    signal:
      fetchOptions.signal ??
      AbortSignal.timeout(timeoutMs ?? DEFAULT_PUBLIC_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getFirstFilledString(
  source: Record<string, unknown> | null | undefined,
  keys: string[],
) {
  if (!source) {
    return null;
  }

  for (const key of keys) {
    const value = source[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

export function getFirstResolvedUrl(
  source: Record<string, unknown> | null | undefined,
  keys: string[],
) {
  return resolveMediaUrl(getFirstFilledString(source, keys));
}

export async function getAcademicServices(query?: {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}) {
  return request<ApiResponse<Paginated<AcademicService>>>(
    "/api/v1/public/academic/services/",
    { next: { revalidate: 300, tags: ["academic-services"] } },
    query,
  );
}

export async function getAcademicYoutube() {
  return request<ApiResponse<AcademicYoutubeSection>>(
    "/api/v1/public/academic/youtube/",
    { next: { revalidate: 600, tags: ["academic-youtube"] } },
  );
}

export async function getAcademicCountdowns(query?: {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}) {
  return request<ApiResponse<Paginated<AcademicCountdown>>>(
    "/api/v1/public/academic/countdown-events/",
    { next: { revalidate: 120, tags: ["academic-countdowns"] } },
    query,
  );
}

export async function getAcademicQuickDownloads(query?: {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}) {
  return request<ApiResponse<Paginated<AcademicQuickDownload>>>(
    "/api/v1/public/academic/quick-downloads/",
    { next: { revalidate: 300, tags: ["academic-downloads"] } },
    query,
  );
}

export async function getAcademicRepository() {
  return request<
    ApiResponse<{
      akuntansi: AcademicRepositoryMaterial[];
      manajemen: AcademicRepositoryMaterial[];
    }>
  >(
    "/api/v1/public/academic/repository/",
    { next: { revalidate: 600, tags: ["academic-repository"] } },
  );
}

export async function getAcademicDigitalResources() {
  return request<ApiResponse<AcademicDigitalResources>>(
    "/api/v1/public/academic/digital-resources/",
    { next: { revalidate: 600, tags: ["academic-digital-resources"] } },
  );
}

export async function getCompetencyAgendas(query?: {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  urgency_tag?: boolean;
  recommendation_tag?: boolean;
  category_tag?: string;
  scope_tag?: string;
  pricing_tag?: string;
}) {
  return request<ApiResponse<Paginated<CompetencyAgendaItem>>>(
    "/api/v1/public/competency/agenda-cards/",
    { next: { revalidate: 120, tags: ["competency-agendas"] } },
    query,
  );
}

export async function getCompetencyWinnerSlides(query?: {
  page?: number;
  page_size?: number;
  ordering?: string;
}) {
  return request<ApiResponse<Paginated<CompetencyWinnerSlide>>>(
    "/api/v1/public/competency/winner-slides/",
    { next: { revalidate: 600, tags: ["competency-winners"] } },
    query,
  );
}

export async function getCabinetCalendar() {
  return request<
    ApiResponse<{
      id: string;
      title: string;
      description: string;
      embed_url: string;
      embed_code: string;
      provider: string;
    }>
  >(
    "/api/v1/public/about/cabinet-calendar/",
    { next: { revalidate: 600, tags: ["cabinet-calendar"] } },
  );
}

export async function getCareerResources() {
  return request<ApiResponse<CareerResources>>(
    "/api/v1/public/career/resources/",
    { next: { revalidate: 600, tags: ["career-resources"] } },
  );
}

export async function getCareerOpportunities(query?: {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}) {
  return request<ApiResponse<Paginated<CareerOpportunity>>>(
    "/api/v1/public/career/opportunities/",
    { next: { revalidate: 300, tags: ["career-opportunities"] } },
    query,
  );
}

export async function getAdvocacyPolicyResources() {
  return request<ApiResponse<AdvocacyPolicyResources>>(
    "/api/v1/public/advocacy/policy-resources/",
    { next: { revalidate: 600, tags: ["advocacy-policy-resources"] } },
  );
}

export async function getFeaturedAspirations(query?: {
  visibility?: "public" | "anonymous";
}) {
  const response = await request<ApiResponse<FeaturedAspiration[]>>(
    "/api/v1/public/aspirations/featured/",
    { next: { revalidate: 120, tags: ["featured-aspirations"] } },
    query,
  );

  return response.data;
}

export async function trackTicket(ticketId?: string) {
  return request<ApiResponse<TicketTracking>>(
    "/api/v1/public/tickets/track/",
    { cache: "no-store", timeoutMs: MUTATION_TIMEOUT_MS },
    {
      ticket_id: ticketId,
    },
  );
}

export function resolveMediaUrl(url: string | null | undefined) {
  if (!url) {
    return null;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export { BASE_URL };
