import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  CircleDollarSign,
  Download,
  FileText,
  NotebookText,
  Sparkles,
  Star,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReset } from "@/components/ScrollReset";
import { HeroBanner } from "@/components/hub-page/HeroBanner";

export const metadata: Metadata = {
  title: "Career Center | Extensipedia",
};

const stats = [
  { value: "15+", label: "Professional Template" },
  { value: "8", label: "Platform Karir" },
  { value: "500+", label: "Template" },
];

const resources = [
  {
    title: "CV Templates",
    description:
      "Master template CV yang telah lulus sistem screening otomatis Big 4, Tech Giants, dan FMCG.",
    meta: "6 template tersedia · DOC & PDF",
    badge: "ATS",
    badgeTone: "success",
    icon: FileText,
  },
  {
    title: "Cover Letter",
    description:
      "Template cover letter profesional dengan struktur yang terbukti meningkatkan response rate hingga 3x lipat.",
    meta: "4 template tersedia · DOC & PDF",
    badge: "ATS",
    badgeTone: "info",
    icon: BadgeCheck,
  },
  {
    title: "Portfolio Guide",
    description:
      "Panduan menyusun portfolio berbasis hasil untuk jalur manajerial dan spesialis.",
    meta: "2 framework tersedia · PDF",
    badge: "Guide",
    badgeTone: "lavender",
    icon: NotebookText,
  },
  {
    title: "Salary Script",
    description:
      "Skrip negosiasi gaji dan kompensasi yang efektif untuk fresh graduate dan career switcher.",
    meta: "3 skenario tersedia · PDF",
    badge: "Hot",
    badgeTone: "warning",
    icon: CircleDollarSign,
  },
] as const;

const getawayGroups = [
  {
    title: "Institusional & Nasional",
    tone: "primary",
    items: [
      {
        name: "CDC UI",
        description: "Pusat Karir Resmi UI",
        accent: "bg-[#fef3c7] text-[#b45309]",
        href: "https://cdc.ui.ac.id/",
      },
      {
        name: "Karirhub Kemnaker",
        description: "Portal Resmi Kementerian",
        accent: "bg-[#dbeafe] text-[#1d4ed8]",
        href: "https://karirhub.kemnaker.go.id/",
      },
    ],
  },
  {
    title: "Professional & Korporat",
    tone: "ocean",
    items: [
      {
        name: "Jobstreet ID",
        description: "Industri Tradisional",
        accent: "bg-[#dbeafe] text-[#1e3a8a]",
        href: "https://www.jobstreet.co.id/",
      },
      {
        name: "Glints",
        description: "Kreatif & Startup",
        accent: "bg-[#f3f4f6] text-[#111827]",
        href: "https://glints.com/id",
      },
    ],
  },
  {
    title: "Gig Economy & Freelance",
    tone: "mint",
    items: [
      {
        name: "Upwork",
        description: "Proyek Spesialis Global",
        accent: "bg-[#14a800] text-white",
        href: "https://www.upwork.com/",
      },
      {
        name: "Fiverr",
        description: "Proyek Singkat",
        accent: "bg-[#1dbf73] text-white",
        href: "https://www.fiverr.com/",
      },
    ],
  },
] as const;

const resourceBadgeClassMap = {
  success: "bg-[#dcfce7] text-[#15803d]",
  info: "bg-[#e0ecff] text-[#2563eb]",
  lavender: "bg-[#f3e8ff] text-[#7c3aed]",
  warning: "bg-[#fff1d6] text-[#d97706]",
} as const;

const getawayToneClassMap = {
  primary: "bg-primary text-base-white",
  ocean: "bg-[#0a5a8a] text-base-white",
  mint: "bg-secondary-soft text-base-white",
} as const;

export default function KarirPage() {
  return (
    <div className="min-h-screen bg-base-white text-primary">
      <ScrollReset />
      <Navbar />

      <main>
        <HeroBanner
          title="Career Center"
          description="Ekosistem resource dan shortcut karir untuk bantu mahasiswa Ekstensi FEB UI menyiapkan CV, portfolio, interview, dan akses ke platform kerja yang relevan."
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

        <section className="bg-base-white px-4 pb-12 pt-6 sm:px-6 sm:pb-14 sm:pt-7 lg:px-8 lg:pb-16">
          <div className="mx-auto mt-0 max-w-[1280px]">
            <div className="grid gap-4 md:grid-cols-3 md:gap-6">
              {stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[20px] bg-base-white px-6 py-7 text-center shadow-[0_4px_17px_rgba(0,0,0,0.14)]"
                >
                  <div className="font-headline text-[34px] leading-none text-primary sm:text-[40px]">
                    {stat.value}
                  </div>
                  <p className="mt-3 font-tagline text-[12px] font-semibold uppercase tracking-[0.08em] text-copy-soft">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-base-white px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div>
              <h2 className="section-title text-[34px] leading-none sm:text-[42px] lg:text-[48px]">
                Resource Vault
              </h2>
              <p className="mt-3 max-w-[780px] font-body text-[15px] leading-7 text-copy-muted sm:text-[18px]">
                Template dan panduan siap pakai, dikurasi untuk standar industri top-tier.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {resources.map((resource) => {
                const Icon = resource.icon;

                return (
                  <article
                    key={resource.title}
                    className="flex h-full flex-col rounded-[20px] border border-[#e5edf3] bg-base-white p-5 shadow-[0_6px_20px_rgba(3,57,93,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-surface-muted text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={[
                          "inline-flex rounded-full px-2.5 py-1 font-tagline text-[11px] font-bold uppercase tracking-[0.08em]",
                          resourceBadgeClassMap[resource.badgeTone],
                        ].join(" ")}
                      >
                        {resource.badge}
                      </span>
                    </div>

                    <div className="mt-5">
                      <h3 className="font-tagline text-[18px] font-bold text-primary">
                        {resource.title}
                      </h3>
                      <p className="mt-3 font-body text-[14px] leading-7 text-copy-muted">
                        {resource.description}
                      </p>
                      <p className="mt-3 font-body text-[12px] font-semibold text-copy-soft">
                        {resource.meta}
                      </p>
                    </div>

                    <a
                      href="#"
                      className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-primary px-4 font-tagline text-[14px] font-semibold !text-white transition hover:brightness-110 [&_svg]:!text-white"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 rounded-[20px] border border-[#d0e1ec] bg-[#e8f4fd] px-5 py-5 sm:px-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-primary text-cta">
                    <Star className="h-6 w-6 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-tagline text-[18px] font-bold text-primary sm:text-[20px]">
                      Case Study & Interview Prep
                    </h3>
                    <p className="mt-2 max-w-[720px] font-body text-[14px] leading-7 text-copy-soft">
                      Bank soal behavioral interview berbasis STAR Method dan business case
                      study untuk latihan yang lebih terarah.
                    </p>
                  </div>
                </div>

                <a
                  href="#"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-primary px-5 font-tagline text-[14px] font-semibold !text-white transition hover:brightness-110 [&_svg]:!text-white"
                >
                  <Sparkles className="h-4 w-4" />
                  Akses Sekarang
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-base-white px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8">
          <div className="mx-auto max-w-[1280px]">
            <div>
              <h2 className="section-title text-[34px] leading-none sm:text-[42px] lg:text-[48px]">
                Career Getaway
              </h2>
              <p className="mt-3 max-w-[860px] font-body text-[15px] leading-7 text-copy-muted sm:text-[18px]">
                Platform karir terpercaya yang dikurasi khusus untuk profil mahasiswa Ekstensi
                FEB UI.
              </p>
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-3">
              {getawayGroups.map((group) => (
                <article
                  key={group.title}
                  className="overflow-hidden rounded-[20px] border border-[#e5edf3] bg-base-white shadow-[0_6px_20px_rgba(3,57,93,0.08)]"
                >
                  <div
                    className={[
                      "flex min-h-[52px] items-center gap-3 px-5 py-4 font-tagline text-[13px] font-bold uppercase tracking-[0.08em]",
                      getawayToneClassMap[group.tone],
                    ].join(" ")}
                  >
                    <span className="h-2.5 w-2.5 rounded-full bg-cta" />
                    {group.title}
                  </div>

                  <div className="space-y-1 p-4">
                    {group.items.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-4 rounded-[14px] px-3 py-3 transition hover:bg-surface-subtle"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={[
                              "flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] font-tagline text-[13px] font-bold",
                              item.accent,
                            ].join(" ")}
                          >
                            {item.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <div className="truncate font-tagline text-[16px] font-bold text-primary">
                              {item.name}
                            </div>
                            <p className="truncate font-body text-[13px] text-copy-muted">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-copy-soft" />
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-[20px] bg-primary px-5 py-5 sm:px-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[12px] bg-cta text-primary">
                    <BriefcaseBusiness className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-tagline text-[18px] font-bold text-base-white sm:text-[20px]">
                      Butuh Template Khusus?
                    </h3>
                    <p className="mt-2 max-w-[760px] font-body text-[14px] leading-7 text-base-white/76">
                      Hubungi Departemen PENGKAR BEM PE FEB UI untuk request template atau
                      konsultasi karir yang lebih spesifik.
                    </p>
                  </div>
                </div>

                <Link
                  href="/tentang-kami"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] bg-cta px-5 font-tagline text-[14px] font-semibold text-primary transition hover:brightness-95"
                >
                  Hubungi PENGKAR
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <p className="mt-8 text-center font-body text-[12px] leading-6 text-copy-soft sm:text-[13px]">
              Seluruh template yang tersedia adalah hak cipta BEM PE FEB UI 2026 dan
              digunakan untuk keperluan non-komersial mahasiswa Ekstensi FEB UI.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
