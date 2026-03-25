import {
  BriefcaseBusiness,
  BookCopy,
  Funnel,
  Megaphone,
  Trophy,
} from "lucide-react";
import { About } from "@/components/About";
import { AspirasiCard } from "@/components/AspirasiCard";
import { EventCard } from "@/components/EventCard";
import { Features, type FeatureItem } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ScrollReset } from "@/components/ScrollReset";
import { Button } from "@/components/ui/Button";

const featureItems: FeatureItem[] = [
  {
    icon: BookCopy,
    title: "Bahan Kuliah & Bank Soal",
    description:
      "Repository lengkap bahan kuliah, slide, dan bank soal untuk semua semester.",
    details: [
      "Akutansi & Manajemen",
      "Kalender Akademik",
      "Canva & Gemini Access",
    ],
    action: "Akses Sekarang",
    href: "/akademik",
    outlined: true,
  },
  {
    icon: Trophy,
    title: "Kompetisi & Seminar",
    description:
      "Info lomba, workshop, dan webinar terbaru untuk pengembangan diri.",
    details: ["Info Kompetisi", "Info Pelatihan"],
    action: "Eksplorasi",
    href: "/kompetensi-karir",
    highlighted: true,
  },
  {
    icon: BriefcaseBusiness,
    title: "Karir & Networking",
    description:
      "Template CV, platform karir, dan resource library untuk akselerasi karirmu.",
    details: ["CV & Cover Letter", "Platform Karir"],
    action: "Lihat Resource",
    href: "/karir",
  },
  {
    icon: Megaphone,
    title: "Layanan Aspirasi",
    description:
      "Sampaikan aspirasimu dan lihat status tiket pengaduan secara transparan.",
    details: ["Jaring Aspirasi", "Tracking Tiket"],
    action: "Sampaikan Aspirasi",
    href: "/advokasi",
  },
];

const events = [
  {
    title: "National Business Case Competition 2026",
    date: "5 Mar 2026",
    tag: "Lomba",
    subtitle: "BEM FE UI - Mixed - Offline",
    tone: "primary" as const,
  },
  {
    title: "Workshop Financial Modeling & Value",
    date: "10 Mar 2026",
    tag: "Workshop",
    subtitle: "Student Lab UI - Hybrid - Limited",
    tone: "sky" as const,
  },
  {
    title: "ASEAN Entrepreneurship Summit 2026",
    date: "14 Mar 2026",
    tag: "Seminar",
    subtitle: "ASEAN Forum - Regional Event",
    tone: "teal" as const,
  },
];

const aspirations = [
  {
    id: "home-1",
    title: "Perspicitatis esse molestiae vel qui.",
    description:
      "Quasi quo sit suscipit tempora aperiam rerum placeat id. Voluptatem praesentium excepturi id. Repudiandae incidunt doloremque. Error est at ullam.",
    user: "Anonim",
  },
  {
    id: "home-2",
    title: "Perspicitatis esse molestiae vel qui.",
    description:
      "Quasi quo sit suscipit tempora aperiam rerum placeat id. Voluptatem praesentium excepturi id. Repudiandae incidunt doloremque. Error est at ullam.",
    user: "Dimasukkan oleh : Lorem Ipsum",
  },
  {
    id: "home-3",
    title: "Perspicitatis esse molestiae vel qui.",
    description:
      "Quasi quo sit suscipit tempora aperiam rerum placeat id. Voluptatem praesentium excepturi id. Repudiandae incidunt doloremque. Error est at ullam.",
    user: "Anonim",
  },
  {
    id: "home-4",
    title: "Perspicitatis esse molestiae vel qui.",
    description:
      "Quasi quo sit suscipit tempora aperiam rerum placeat id. Voluptatem praesentium excepturi id. Repudiandae incidunt doloremque. Error est at ullam.",
    user: "Dimasukkan oleh : Lorem Ipsum",
    featured: true,
    evidenceImage: "/hero-campus.jpg",
  },
];

export default function Home() {

  return (
    <div className="min-h-screen bg-base-white text-primary">
      <ScrollReset />
      <Navbar />
      <Hero />

      <About
        title="Tentang Gema Cita Bersama"
        description="BEM PE FEB UI Kabinet Gema Cita Bersama hadir sebagai wadah kolaboratif yang didedikasikan untuk memperjuangkan aspirasi dan mendukung penuh perjalanan akademik mahasiswa Ekstensi. Kami percaya bahwa setiap mahasiswa memiliki potensi besar yang harus diwujudkan melalui akses informasi yang transparan dan inklusif."
      />

      <Features items={featureItems} />

      <section
        id="kompetisi-karir"
        className="bg-base-white"
      >
        <div className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="section-title text-[26px] leading-none sm:text-[30px] lg:text-[36px]">
                Update Terbaru
              </h2>
              <p className="section-subtitle mt-2">
                Kompetisi & Seminar Pilihan
              </p>
            </div>

            <a
              href="/kompetensi-karir"
              className="font-tagline text-sm font-semibold text-primary transition hover:text-cta"
            >
              Lihat Semua
            </a>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
        </div>
      </section>

      <section id="aspirasi" className="bg-base-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="section-eyebrow">Aspirasi Mahasiswa</div>
            <h2 className="section-title mt-2 text-[28px] leading-none sm:text-[32px] lg:text-[38px]">
              Jaring Aspirasi
            </h2>
          </div>

          <div className="muted-copy mt-6 flex flex-wrap items-center gap-2 text-[12px] sm:gap-3">
            <span className="inline-flex items-center gap-2">
              <Funnel className="h-4 w-4" />
              Publikasi:
            </span>

            {["Semua", "Publik", "Anonim"].map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={[
                  "font-tagline rounded-full px-3 py-1.5 text-xs transition sm:px-4",
                  index === 0 ? "pill-tab-active" : "pill-tab",
                ].join(" ")}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {aspirations.map((item) => (
              <AspirasiCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-muted py-10 sm:py-14">
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="surface-card mx-auto max-w-[720px] rounded-[16px] p-5 sm:p-6">
            <h2 className="section-title flex items-center gap-2 text-[24px] leading-tight sm:text-[28px]">
              <span className="text-cta">⌕</span>
              Cek Status Aspirasi
            </h2>

            <p className="muted-copy mt-2 text-[13px] leading-6 sm:text-sm">
              Masukkan ID Tiket untuk melihat status terkini pengaduan atau
              aspirasi Anda.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <input
                type="text"
                placeholder="ID Tiket (Contoh: ASP-2026-XXXX)"
                className="input-base h-[44px] rounded-xl px-4 text-[13px] outline-none placeholder:text-[13px]"
              />

              <Button
                variant="secondary"
                className="h-[44px] w-full justify-center rounded-xl px-4 text-[13px]"
              >
                Lacak
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
