import type { Metadata } from "next";
import { ChevronDown, Funnel, Search } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReset } from "@/components/ScrollReset";
import { CareerCard } from "@/components/hub-page/CareerCard";
import { HeroBanner } from "@/components/hub-page/HeroBanner";

export const metadata: Metadata = {
  title: "Career Center | Extensipedia",
};

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

const careerCards = [
  {
    type: "Internship" as const,
    title: "Internship Preparation Bootcamp",
    organizer: "Career Center Extensipedia",
    description:
      "Persiapan intensif untuk internship cycle: CV review, interview prep, dan strategi apply yang lebih terarah.",
    deadline: "12 Apr 2026",
    ctaLabel: "Daftar Sekarang",
  },
  {
    type: "Career Event" as const,
    title: "Networking Night with Recruiters",
    organizer: "BEM PE FEB UI x Industry Partners",
    description:
      "Sesi networking dengan recruiter dan alumni untuk memahami hiring process dan ekspektasi industri.",
    deadline: "18 Apr 2026",
    ctaLabel: "Lihat Detail",
  },
  {
    type: "Career Center" as const,
    title: "Career Center Services",
    organizer: "Extensipedia Career Center",
    description:
      "Akses CV clinic, simulasi interview, review LinkedIn, dan konsultasi arah karir dalam satu hub layanan.",
    deadline: "Open Access",
    ctaLabel: "Akses Layanan",
  },
];

export default function KarirPage() {
  return (
    <div className="min-h-screen bg-base-white text-primary">
      <ScrollReset />
      <Navbar />

      <main>
        <HeroBanner
          title="Career Center"
          description="Hub karir untuk bantu persiapan internship, networking, pengembangan profil profesional, dan kesiapan masuk dunia kerja."
          backgroundImage="/about/hero-bg.png"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Kompetensi & Karir", href: "/kompetensi-karir" },
            { label: "Career Center" },
          ]}
          tabs={[
            { label: "Competency Hub", icon: "trophy", href: "/kompetensi-karir" },
            { label: "Career Center", icon: "briefcase", active: true, href: "/karir" },
          ]}
        />

        <section className="bg-base-white px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8 lg:px-8 lg:pb-14">
          <div className="mx-auto max-w-[1271px] rounded-[22px] bg-base-white p-4 shadow-[0_4px_17px_rgba(0,0,0,0.18)] sm:rounded-[30px] sm:p-6 lg:p-8">
            <div className="flex h-[48px] items-center rounded-[16px] border border-panel-border bg-surface-subtle px-4 sm:h-[54px] sm:rounded-[20px] sm:px-5">
              <Search className="h-6 w-6 text-copy-soft" />
              <span className="ml-3 font-body text-[14px] text-[#9ca3af] sm:ml-4 sm:text-[16px]">
                Cari internship, event karir, atau layanan career center...
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
                  {["Semua", "Internship", "Career Event", "Career Center"].map((chip, index) => (
                    <button
                      key={chip}
                      type="button"
                      className={[
                        "rounded-[8px] px-3 py-1.5 font-tagline text-[13px] font-semibold",
                        index === 0 ? "bg-primary text-base-white" : "bg-base-white text-[#64748b]",
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
                {["Semua", "Internship", "Career Event", "Career Center"].map((chip, index) => (
                  <button
                    key={chip}
                    type="button"
                    className={[
                      "rounded-[8px] px-3 py-1.5 font-tagline text-[15px] font-semibold",
                      index === 0 ? "bg-primary text-base-white" : "bg-[#f3f4f6] text-[#64748b]",
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
              <span>Menampilkan 3 agenda karir</span>
              <span>Diurutkan berdasarkan deadline terdekat</span>
            </div>

            <div className="grid gap-4 sm:gap-5 xl:grid-cols-3 xl:gap-6">
              {careerCards.map((card) => (
                <CareerCard key={card.title} {...card} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
