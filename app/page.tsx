import { BriefcaseBusiness, BookCopy, Megaphone, Trophy } from "lucide-react";
import { About } from "@/components/About";
import { CompetitionCard } from "@/components/hub-page/CompetitionCard";
import { Features, type FeatureItem } from "@/components/Features";
import { FeaturedAspirationsSection } from "@/components/support-hub/FeaturedAspirationsSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ScrollReset } from "@/components/ScrollReset";
import { TicketTracker } from "@/components/support-hub/TicketTracker";
import {
  getCompetencyAgendas,
  getFeaturedAspirations,
  type CompetencyAgendaItem,
  type FeaturedAspiration,
} from "@/lib/public-api";
import {
  competencyDeadlineFormatter,
  getCompetencyCountdownLabel,
  getCompetencyTone,
} from "@/lib/competency-ui";

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

export default async function Home() {
  let agendas: CompetencyAgendaItem[] = [];
  let aspirations: FeaturedAspiration[] = [];

  const [agendaResult, aspirationResult] = await Promise.allSettled([
    getCompetencyAgendas({
      page_size: 3,
      ordering: "-created_at,-updated_at,deadline_date,title",
    }),
    getFeaturedAspirations(),
  ]);

  if (agendaResult.status === "fulfilled") {
    agendas = agendaResult.value.data.items.slice(0, 3);
  }

  if (aspirationResult.status === "fulfilled") {
    aspirations = aspirationResult.value;
  }

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

      <section id="kompetisi-karir" className="bg-base-white">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="section-title text-[26px] leading-none sm:text-[30px] lg:text-[36px]">
                Update Terbaru
              </h2>
              <p className="section-subtitle mt-2">
                Tiga agenda kompetensi teratas dari Competency Hub
              </p>
            </div>

            <a
              href="/kompetensi-karir"
              className="font-tagline text-sm font-semibold text-primary transition hover:text-cta"
            >
              Lihat Semua
            </a>
          </div>

          {agendas.length > 0 ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {agendas.map((item) => (
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
          ) : (
            <div className="mt-6 rounded-[24px] border border-dashed border-panel-border bg-surface-subtle px-6 py-12 text-center">
              <p className="font-headline text-[28px] text-primary">
                Belum ada update kompetisi.
              </p>
              <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-7 text-copy-soft">
                Data agenda kompetensi belum tersedia dari backend. Lihat halaman
                Competency Hub untuk pembaruan berikutnya.
              </p>
            </div>
          )}
        </div>
      </section>

      <FeaturedAspirationsSection aspirations={aspirations} />

      <section className="bg-surface-muted py-10 sm:py-14">
        <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <div className="section-eyebrow">Tracking</div>
            <h2 className="section-title mt-2 text-[28px] leading-none sm:text-[32px] lg:text-[38px]">
              Cek Status Aspirasi
            </h2>
            <p className="muted-copy mt-3 text-[13px] leading-6 sm:text-sm">
              Gunakan tracker yang sama seperti halaman lacak tiket untuk melihat
              progres aspirasi berdasarkan ticket ID.
            </p>
          </div>

          <div className="mx-auto max-w-[780px]">
            <TicketTracker />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
