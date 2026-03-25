import type { Metadata } from "next";
import {
  ChevronDown,
  Funnel,
  Search,
  ArrowRight,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReset } from "@/components/ScrollReset";
import { CompetitionCard } from "@/components/hub-page/CompetitionCard";
import { HeroBanner } from "@/components/hub-page/HeroBanner";

export const metadata: Metadata = {
  title: "Kompetensi & Karir Hub | Extensipedia",
};

const competitionCards = [
  {
    category: "Lomba" as const,
    scope: "Nasional" as const,
    title: "National Business Case Competition 2026",
    organizer: "BEM FE UI",
    description:
      "Kompetisi business case bergengsi tingkat nasional untuk mahasiswa S1 dan D3/S1. UI merupakan salah satu tuan rumah penyelenggara tahun ini.",
    deadline: "5 Mar 2026",
    urgency: "4 hari lagi",
    tone: "primary" as const,
    recommended: true,
    findTeam: true,
  },
  {
    category: "Workshop" as const,
    scope: "Nasional" as const,
    title: "Workshop Financial Modeling & Value",
    organizer: "Departemen DIKTI BEM PE FEB UI",
    description:
      "Workshop intensif 2 hari tentang financial modeling menggunakan Excel dan teknik valuasi DCF.",
    deadline: "10 Mar 2026",
    urgency: "9 hari lagi",
    tone: "sky" as const,
  },
  {
    category: "Lomba" as const,
    scope: "Internasional" as const,
    title: "ASEAN Student Entrepreneurship Summit",
    organizer: "ASEAN University Network",
    description:
      "Summit entrepreneurship tingkat ASEAN dengan format pitch competition dan networking lintas negara.",
    deadline: "15 Mar 2026",
    urgency: "14 hari lagi",
    tone: "green" as const,
    findTeam: true,
  },
  {
    category: "Lomba" as const,
    scope: "Nasional" as const,
    title: "National Business Case Competition 2026",
    organizer: "BEM FE UI",
    description:
      "Kompetisi business case bergengsi tingkat nasional untuk mahasiswa S1 dan D3/S1. UI merupakan salah satu tuan rumah penyelenggara tahun ini.",
    deadline: "5 Mar 2026",
    urgency: "4 hari lagi",
    tone: "primary" as const,
    recommended: true,
    findTeam: true,
  },
  {
    category: "Workshop" as const,
    scope: "Nasional" as const,
    title: "Workshop Financial Modeling & Value",
    organizer: "Departemen DIKTI BEM PE FEB UI",
    description:
      "Workshop intensif 2 hari tentang financial modeling menggunakan Excel dan teknik valuasi DCF.",
    deadline: "10 Mar 2026",
    urgency: "9 hari lagi",
    tone: "sky" as const,
  },
  {
    category: "Lomba" as const,
    scope: "Internasional" as const,
    title: "ASEAN Student Entrepreneurship Summit",
    organizer: "ASEAN University Network",
    description:
      "Summit entrepreneurship tingkat ASEAN dengan format pitch competition dan networking lintas negara.",
    deadline: "15 Mar 2026",
    urgency: "14 hari lagi",
    tone: "green" as const,
    findTeam: true,
  },
];

const years = ["2025", "2026", "2027"];
const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function KompetensiKarirPage() {
  return (
    <div className="min-h-screen bg-base-white text-primary">
      <ScrollReset />
      <Navbar />

      <main>
        <HeroBanner
          title="Kompetensi & Karir Hub"
          description="Ekosistem terpadu untuk mengembangkan kompetensi akademik dan mengakselerasi perjalanan karirmu sebagai mahasiswa Ekstensi FEB UI."
          backgroundImage="/about/hero-bg.png"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Kompetensi & Karir" },
          ]}
          tabs={[
            { label: "Competency Hub", icon: "trophy", active: true, href: "/kompetensi-karir" },
            { label: "Career Center", icon: "briefcase", href: "/karir" },
          ]}
        />

        <section className="bg-base-white px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8 lg:pb-14">
          <div className="mx-auto max-w-[1271px] rounded-[22px] bg-base-white p-4 shadow-[0_4px_17px_rgba(0,0,0,0.18)] sm:rounded-[30px] sm:p-6 lg:p-8">
            <div className="flex h-[48px] items-center rounded-[16px] border border-panel-border bg-surface-subtle px-4 sm:h-[54px] sm:rounded-[20px] sm:px-5">
              <Search className="h-6 w-6 text-copy-soft" />
              <span className="ml-3 font-body text-[14px] text-[#9ca3af] sm:ml-4 sm:text-[16px]">
                Cari Kompetisi, workshop, atau sertifikasi...
              </span>
            </div>

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
                  <select className="h-[44px] w-full appearance-none rounded-[14px] border border-[#94a3b8] bg-base-white px-4 pr-10 font-tagline text-[14px] text-black outline-none">
                    {years.map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-copy-soft" />
                </label>

                <label className="relative block">
                  <select className="h-[44px] w-full appearance-none rounded-[14px] border border-[#94a3b8] bg-base-white px-4 pr-10 font-tagline text-[14px] text-black outline-none">
                    {months.map((month) => (
                      <option key={month}>{month}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-copy-soft" />
                </label>

                <div className="flex flex-wrap gap-2">
                  {[
                    "Semua Kategori",
                    "Lomba",
                    "Workshop",
                    "Nasional",
                    "Internasional",
                    "Gratis",
                    "Berbayar",
                  ].map((chip, index) => (
                    <button
                      key={chip}
                      type="button"
                      className={[
                        "rounded-[8px] px-3 py-1.5 font-tagline text-[13px] font-semibold",
                        index === 0
                          ? "bg-primary text-base-white"
                          : "bg-base-white text-[#64748b]",
                      ].join(" ")}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </details>

            <div className="mt-6 hidden lg:block">
              <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
                <label className="relative block">
                  <select className="h-[52px] w-full appearance-none rounded-[18px] border border-[#94a3b8] bg-surface-subtle px-5 pr-12 font-tagline text-[16px] text-black outline-none">
                    {years.map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-copy-soft" />
                </label>
                <label className="relative block">
                  <select className="h-[52px] w-full appearance-none rounded-[18px] border border-[#94a3b8] bg-surface-subtle px-5 pr-12 font-tagline text-[16px] text-black outline-none">
                    {months.map((month) => (
                      <option key={month}>{month}</option>
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
                {[
                  "Semua Kategori",
                  "Lomba",
                  "Workshop",
                  "Nasional",
                  "Internasional",
                  "Gratis",
                  "Berbayar",
                ].map((chip, index) => (
                  <button
                    key={chip}
                    type="button"
                    className={[
                      "rounded-[8px] px-3 py-1.5 font-tagline text-[15px] font-semibold",
                      index === 0
                        ? "bg-primary text-base-white"
                        : "bg-[#f3f4f6] text-[#64748b]",
                    ].join(" ")}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-base-white px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
          <div className="mx-auto max-w-[1271px]">
            <div className="mb-5 flex flex-col gap-1 text-[12px] font-tagline text-copy-soft sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
              <span>Menampilkan 6 agenda</span>
              <span>Diurutkan berdasarkan deadline terdekat</span>
            </div>

            <div className="grid gap-4 sm:gap-5 xl:grid-cols-3 xl:gap-6">
              {competitionCards.map((card, index) => (
                <CompetitionCard key={`${card.title}-${index}`} {...card} />
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[12px] border border-primary bg-base-white px-5 font-tagline text-[15px] font-semibold text-primary"
              >
                Lihat Agenda Lainnya
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
