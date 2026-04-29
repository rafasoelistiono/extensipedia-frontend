"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Funnel,
  Search,
} from "lucide-react";
import { CompetitionCard } from "@/components/hub-page/CompetitionCard";
import {
  resolveMediaUrl,
  type CompetencyAgendaItem,
  type CompetencyWinnerSlide,
} from "@/lib/public-api";
import {
  competencyDeadlineFormatter,
  getCompetencyCountdownLabel,
  getCompetencyTone,
} from "@/lib/competency-ui";

type CompetencyHubClientProps = {
  items: CompetencyAgendaItem[];
  winnerSlides: CompetencyWinnerSlide[];
};

const ITEMS_PER_PAGE = 6;

const monthFormatter = new Intl.DateTimeFormat("id-ID", { month: "long" });

const localWinnerSlides = [
  {
    image_url: "/competency/winner-1.png",
    alt_text: "Winner slide 1",
  },
  {
    image_url: "/competency/winner-2.png",
    alt_text: "Winner slide 2",
  },
] as const;

function getYearOptions(items: CompetencyAgendaItem[]) {
  return Array.from(
    new Set(
      items
        .map((item) => new Date(item.deadline_date))
        .filter((date) => !Number.isNaN(date.getTime()))
        .map((date) => String(date.getFullYear())),
    ),
  ).sort();
}

function getMonthOptions(items: CompetencyAgendaItem[]) {
  return Array.from(
    new Set(
      items
        .map((item) => new Date(item.deadline_date))
        .filter((date) => !Number.isNaN(date.getTime()))
        .map((date) => String(date.getMonth())),
    ),
  ).sort((left, right) => Number(left) - Number(right));
}

export function CompetencyHubClient({
  items,
  winnerSlides,
}: CompetencyHubClientProps) {
  const [search, setSearch] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [scopeFilter, setScopeFilter] = useState("all");
  const [pricingFilter, setPricingFilter] = useState("all");
  const [urgencyOnly, setUrgencyOnly] = useState(false);
  const [recommendationOnly, setRecommendationOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [winnerSlide, setWinnerSlide] = useState(0);

  const yearOptions = useMemo(() => getYearOptions(items), [items]);
  const monthOptions = useMemo(() => getMonthOptions(items), [items]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const deadline = new Date(item.deadline_date);
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.short_description.toLowerCase().includes(query) ||
        item.category_tag.toLowerCase().includes(query) ||
        item.scope_tag.toLowerCase().includes(query) ||
        item.pricing_tag.toLowerCase().includes(query);

      const matchesYear =
        selectedYear === "all" ||
        (!Number.isNaN(deadline.getTime()) &&
          String(deadline.getFullYear()) === selectedYear);

      const matchesMonth =
        selectedMonth === "all" ||
        (!Number.isNaN(deadline.getTime()) &&
          String(deadline.getMonth()) === selectedMonth);

      const matchesCategory =
        categoryFilter === "all" ||
        item.category_tag.toLowerCase() === categoryFilter;

      const matchesScope =
        scopeFilter === "all" || item.scope_tag.toLowerCase() === scopeFilter;

      const matchesPricing =
        pricingFilter === "all" ||
        item.pricing_tag.toLowerCase() === pricingFilter;

      const matchesUrgency = !urgencyOnly || item.urgency_tag;
      const matchesRecommendation =
        !recommendationOnly || item.recommendation_tag;

      return (
        matchesSearch &&
        matchesYear &&
        matchesMonth &&
        matchesCategory &&
        matchesScope &&
        matchesPricing &&
        matchesUrgency &&
        matchesRecommendation
      );
    });
  }, [
    categoryFilter,
    items,
    pricingFilter,
    recommendationOnly,
    scopeFilter,
    search,
    selectedMonth,
    selectedYear,
    urgencyOnly,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const displayedWinnerSlides =
    winnerSlides.length > 0 ? winnerSlides : localWinnerSlides;

  const safeWinnerSlide =
    displayedWinnerSlides.length > 0
      ? winnerSlide % displayedWinnerSlides.length
      : 0;

  const activeWinner = displayedWinnerSlides[safeWinnerSlide];
  const activeWinnerImageUrl = resolveMediaUrl(activeWinner?.image_url) ?? "";

  const chips = [
    {
      key: "all",
      label: "Semua Kategori",
      active:
        categoryFilter === "all" &&
        scopeFilter === "all" &&
        pricingFilter === "all" &&
        !urgencyOnly &&
        !recommendationOnly,
      onClick: () => {
        setCategoryFilter("all");
        setScopeFilter("all");
        setPricingFilter("all");
        setUrgencyOnly(false);
        setRecommendationOnly(false);
      },
    },
    {
      key: "lomba",
      label: "Lomba",
      active: categoryFilter === "lomba",
      onClick: () => setCategoryFilter((value) => (value === "lomba" ? "all" : "lomba")),
    },
    {
      key: "workshop",
      label: "Workshop",
      active: categoryFilter === "workshop",
      onClick: () =>
        setCategoryFilter((value) => (value === "workshop" ? "all" : "workshop")),
    },
    {
      key: "nasional",
      label: "Nasional",
      active: scopeFilter === "nasional",
      onClick: () => setScopeFilter((value) => (value === "nasional" ? "all" : "nasional")),
    },
    {
      key: "internasional",
      label: "Internasional",
      active: scopeFilter === "internasional",
      onClick: () =>
        setScopeFilter((value) => (value === "internasional" ? "all" : "internasional")),
    },
    {
      key: "gratis",
      label: "Gratis",
      active: pricingFilter === "tidak berbayar",
      onClick: () =>
        setPricingFilter((value) =>
          value === "tidak berbayar" ? "all" : "tidak berbayar",
        ),
    },
    {
      key: "berbayar",
      label: "Berbayar",
      active: pricingFilter === "berbayar",
      onClick: () =>
        setPricingFilter((value) => (value === "berbayar" ? "all" : "berbayar")),
    },
    {
      key: "urgent",
      label: "Urgensi",
      active: urgencyOnly,
      onClick: () => setUrgencyOnly((value) => !value),
    },
    {
      key: "recommended",
      label: "Rekomendasi",
      active: recommendationOnly,
      onClick: () => setRecommendationOnly((value) => !value),
    },
  ];

  return (
    <>
      <section className="bg-base-white px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8 lg:pb-14">
        <div className="mx-auto max-w-[1271px] rounded-[22px] bg-base-white p-4 shadow-[0_4px_17px_rgba(0,0,0,0.18)] sm:rounded-[30px] sm:p-6 lg:p-8">
          <label className="flex h-[48px] items-center rounded-[16px] border border-panel-border bg-surface-subtle px-4 sm:h-[54px] sm:rounded-[20px] sm:px-5">
            <Search className="h-6 w-6 text-copy-soft" />
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Cari kompetisi, workshop, atau sertifikasi..."
              className="ml-3 h-full w-full bg-transparent font-body text-[14px] text-primary outline-none placeholder:text-[#9ca3af] sm:ml-4 sm:text-[16px]"
            />
          </label>

          <details className="mt-4 rounded-[18px] border border-panel-border bg-surface-subtle p-4 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between font-tagline text-[15px] font-semibold text-primary">
              <span className="inline-flex items-center gap-2">
                <Funnel className="h-4 w-4" />
                Filter
              </span>
              <ChevronDown className="h-4 w-4" />
            </summary>

            <div className="mt-4 grid gap-3">
              <label className="relative block">
                <select
                  value={selectedYear}
                  onChange={(event) => {
                    setSelectedYear(event.target.value);
                    setPage(1);
                  }}
                  className="h-[44px] w-full appearance-none rounded-[14px] border border-[#94a3b8] bg-base-white px-4 pr-10 font-tagline text-[14px] text-black outline-none"
                >
                  <option value="all">Semua Tahun</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-copy-soft" />
              </label>

              <label className="relative block">
                <select
                  value={selectedMonth}
                  onChange={(event) => {
                    setSelectedMonth(event.target.value);
                    setPage(1);
                  }}
                  className="h-[44px] w-full appearance-none rounded-[14px] border border-[#94a3b8] bg-base-white px-4 pr-10 font-tagline text-[14px] text-black outline-none"
                >
                  <option value="all">Semua Bulan</option>
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>
                      {monthFormatter.format(new Date(2026, Number(month), 1))}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-copy-soft" />
              </label>

              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <button
                    key={chip.key}
                    type="button"
                    onClick={() => {
                      chip.onClick();
                      setPage(1);
                    }}
                    className={[
                      "rounded-[8px] px-3 py-1.5 font-tagline text-[13px] font-semibold",
                      chip.active
                        ? "bg-primary text-base-white"
                        : "bg-base-white text-[#64748b]",
                    ].join(" ")}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          </details>

          <div className="mt-6 hidden lg:block">
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
              <label className="relative block">
                <select
                  value={selectedYear}
                  onChange={(event) => {
                    setSelectedYear(event.target.value);
                    setPage(1);
                  }}
                  className="h-[52px] w-full appearance-none rounded-[18px] border border-[#94a3b8] bg-surface-subtle px-5 pr-12 font-tagline text-[16px] text-black outline-none"
                >
                  <option value="all">Semua Tahun</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-copy-soft" />
              </label>
              <label className="relative block">
                <select
                  value={selectedMonth}
                  onChange={(event) => {
                    setSelectedMonth(event.target.value);
                    setPage(1);
                  }}
                  className="h-[52px] w-full appearance-none rounded-[18px] border border-[#94a3b8] bg-surface-subtle px-5 pr-12 font-tagline text-[16px] text-black outline-none"
                >
                  <option value="all">Semua Bulan</option>
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>
                      {monthFormatter.format(new Date(2026, Number(month), 1))}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-copy-soft" />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 font-tagline text-[15px] text-copy-soft">
                <Funnel className="h-5 w-5" />
                Filter
              </span>
              {chips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => {
                    chip.onClick();
                    setPage(1);
                  }}
                  className={[
                    "rounded-[8px] px-3 py-1.5 font-tagline text-[15px] font-semibold",
                    chip.active
                      ? "bg-primary text-base-white"
                      : "bg-[#f3f4f6] text-[#64748b]",
                  ].join(" ")}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-white px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-[1271px]">
          <div className="mb-5 flex flex-col gap-1 text-[12px] font-tagline text-copy-soft sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <span>Menampilkan {filteredItems.length} agenda</span>
            <span>Diurutkan berdasarkan deadline terdekat</span>
          </div>

          {paginatedItems.length > 0 ? (
            <>
              <div className="grid gap-4 sm:gap-5 xl:grid-cols-3 xl:gap-6">
                {paginatedItems.map((item) => (
                  <CompetitionCard
                    key={item.id}
                    title={item.title}
                    description={item.short_description}
                    deadline={competencyDeadlineFormatter.format(new Date(item.deadline_date))}
                    countdownLabel={getCompetencyCountdownLabel(item.countdown_days)}
                    category={item.category_tag}
                    scope={item.scope_tag}
                    pricing={item.pricing_tag}
                    urgency={item.urgency_tag}
                    recommended={item.recommendation_tag}
                    registrationLink={item.registration_link}
                    googleCalendarLink={item.google_calendar_link}
                    tone={getCompetencyTone(item)}
                  />
                ))}
              </div>

              {filteredItems.length > ITEMS_PER_PAGE ? (
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                  <p className="text-[13px] text-copy-soft">
                    Halaman {currentPage} dari {totalPages}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPage((pageValue) => Math.max(1, Math.min(pageValue, totalPages) - 1))
                      }
                      disabled={currentPage === 1}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-primary bg-base-white px-4 font-tagline text-[15px] font-semibold text-primary disabled:cursor-not-allowed disabled:border-panel-border disabled:text-copy-soft"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Sebelumnya
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPage((pageValue) =>
                          Math.min(totalPages, Math.min(pageValue, totalPages) + 1),
                        )
                      }
                      disabled={currentPage === totalPages}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-primary bg-base-white px-4 font-tagline text-[15px] font-semibold text-primary disabled:cursor-not-allowed disabled:border-panel-border disabled:text-copy-soft"
                    >
                      Berikutnya
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded-[24px] border border-dashed border-panel-border bg-surface-subtle px-6 py-12 text-center">
              <p className="font-headline text-[28px] text-primary">
                Belum ada berita kompetisi.
              </p>
              <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-7 text-copy-soft">
                Data agenda dari backend belum tersedia atau tidak ada yang cocok
                dengan kata kunci dan filter yang dipilih.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-base-white px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8 lg:pb-12">
        <div className="mx-auto max-w-[1271px] rounded-[20px] border border-[#d0e1ec] bg-[#e8f4fd] p-3 sm:p-4 lg:rounded-[24px] lg:px-[43px] lg:py-[26px]">
          <div className="flex flex-col gap-4">
            <div className="relative mx-auto flex aspect-square w-full max-w-[640px] items-center justify-center overflow-hidden rounded-[14px] bg-primary lg:max-w-[720px] lg:rounded-[10px]">
              {activeWinnerImageUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeWinnerImageUrl}
                    alt={activeWinner?.alt_text ?? "Winner slide"}
                    className="h-full w-full object-contain object-center"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,57,93,0.12),rgba(3,57,93,0.18))]" />
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-surface-subtle px-6 text-center">
                  <p className="max-w-[360px] font-tagline text-[14px] text-copy-soft sm:text-[15px]">
                    Winner slide belum tersedia.
                  </p>
                </div>
              )}

              {displayedWinnerSlides.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setWinnerSlide((current) =>
                        current === 0 ? displayedWinnerSlides.length - 1 : current - 1,
                      )
                    }
                    aria-label="Lihat foto pemenang sebelumnya"
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-base-white/90 text-primary shadow-md transition hover:scale-105"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setWinnerSlide((current) =>
                        current === displayedWinnerSlides.length - 1 ? 0 : current + 1,
                      )
                    }
                    aria-label="Lihat foto pemenang berikutnya"
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-base-white/90 text-primary shadow-md transition hover:scale-105"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              ) : null}
            </div>

            <div className="flex flex-col gap-4 rounded-[18px] border border-primary bg-[#dbe9f5] px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:rounded-[20px] lg:px-5">
              <div className="max-w-[663px]">
                <h2 className="section-title text-[20px] leading-tight">
                  Won Something? Let Us Know
                </h2>
                <p className="mt-1 text-[14px] leading-6 text-copy-soft sm:text-[16px]">
                  If you or your team just won an award or received recognition,
                  send it our way so we can celebrate it.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-[10px] bg-primary px-4 font-tagline text-[14px] font-semibold text-base-white sm:text-[15px] lg:w-[225px]"
                aria-label="Notify Us"
              >
                <span>Notify Us</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
