import type { Metadata } from "next";
import {
  CalendarClock,
  CalendarDays,
  Download,
  Palette,
  ShieldAlert,
  Sparkles,
  Youtube,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReset } from "@/components/ScrollReset";
import { RepositoryCard } from "@/components/hub-page/RepositoryCard";
import { HeroBanner } from "@/components/hub-page/HeroBanner";
import { SectionHeader } from "@/components/about-page/SectionHeader";
import { getAcademicCountdowns, getAcademicYoutube } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Akademik Hub | Extensipedia",
};

function getCountdownParts(targetDateTime: string) {
  const now = new Date();
  const target = new Date(targetDateTime);
  const diff = Math.max(0, target.getTime() - now.getTime());

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes, target };
}

export default async function AkademikPage() {
  let youtubeEmbedUrl: string | null = null;
  let countdownItem:
    | {
        title: string;
        targetDateTime: string;
      }
    | null = null;

  try {
    const youtubeResponse = await getAcademicYoutube();
    youtubeEmbedUrl = youtubeResponse.data.embed_url;
  } catch {
    youtubeEmbedUrl = null;
  }

  try {
    const countdownResponse = await getAcademicCountdowns();
    const firstItem = countdownResponse.data.items[0];

    if (firstItem) {
      countdownItem = {
        title: firstItem.title,
        targetDateTime: firstItem.target_datetime,
      };
    }
  } catch {
    countdownItem = null;
  }

  const countdown = countdownItem
    ? getCountdownParts(countdownItem.targetDateTime)
    : null;

  return (
    <div className="min-h-screen bg-base-white text-primary">
      <ScrollReset />
      <Navbar />

      <main>
        <HeroBanner
          title="Akademik Hub"
          description="Pusat sumber daya akademik terpadu untuk mahasiswa Program Ekstensi Fakultas Ekonomi dan Bisnis Universitas Indonesia. Akses bahan kuliah, informasi kompetisi, dan layanan aspirasi dalam satu platform."
          backgroundImage="/about/hero-bg.png"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Akademik" },
          ]}
        />

        <section className="bg-base-white px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
          <div className="mx-auto grid max-w-[1246px] gap-4 sm:gap-5 xl:grid-cols-3 xl:gap-6">
            <article className="rounded-[18px] bg-primary p-5 text-base-white shadow-[0_4px_17px_rgba(0,0,0,0.15)] sm:rounded-[20px] sm:p-7">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#385959] sm:h-14 sm:w-14 sm:rounded-[16px]">
                  <CalendarClock className="h-7 w-7 text-cta sm:h-8 sm:w-8" />
                </div>
                <div>
                  <div className="font-body text-[12px] uppercase tracking-[0.08em] text-[#cbd5e1]">
                    Countdown
                  </div>
                  <div className="font-tagline text-[18px] text-base-white sm:text-[20px]">
                    {countdownItem?.title ?? "Event Akademik"}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center sm:mt-7">
                {[
                  [String(countdown?.days ?? 0), "Hari"],
                  [String(countdown?.hours ?? 0), "Jam"],
                  [String(countdown?.minutes ?? 0), "Menit"],
                ].map(([value, label], index) => (
                  <div key={label} className="relative">
                    <div className="font-headline text-[44px] leading-none text-cta sm:text-[58px]">
                      {value}
                    </div>
                    <div className="mt-1 font-tagline text-[14px] text-[#cbd5e1] sm:mt-2 sm:text-[17px]">
                      {label}
                    </div>
                    {index < 2 ? (
                      <span className="absolute -right-1 top-1 font-headline text-[44px] leading-none text-[#cbd5e1] sm:-right-2 sm:top-2 sm:text-[58px]">
                        :
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="mt-5 h-[10px] rounded-full bg-[rgba(241,245,249,0.2)] sm:mt-6 sm:h-[13px]">
                <div className="h-[10px] w-[66%] rounded-full bg-cta sm:h-[13px]" />
              </div>

              <div className="mt-5 border-t border-base-white/20 pt-4 font-tagline text-[14px] text-[#cbd5e1]/60 sm:mt-6 sm:pt-5 sm:text-[15px]">
                Target :{" "}
                {countdown
                  ? `${countdownItem?.title} - ${countdown.target.toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}`
                  : "Belum tersedia"}
              </div>
            </article>

            <article className="rounded-[18px] bg-base-white p-5 shadow-[0_4px_17px_rgba(0,0,0,0.15)] sm:rounded-[20px] sm:p-7">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-primary sm:h-14 sm:w-14 sm:rounded-[16px]">
                  <CalendarDays className="h-7 w-7 text-cta sm:h-8 sm:w-8" />
                </div>
                <div>
                  <div className="font-body text-[12px] uppercase tracking-[0.08em] text-copy-soft">
                    Quick Download
                  </div>
                  <div className="font-tagline text-[18px] text-primary sm:text-[20px]">Kalender Akademik</div>
                </div>
              </div>

              <p className="mt-5 font-tagline text-[14px] text-primary sm:mt-6 sm:text-[15px]">
                Download PDF resmi kalender akademik UI Semester Genap 2025/2026.
              </p>

              <div className="mt-5 flex items-center gap-3 rounded-[10px] border border-black/50 px-3 py-3 sm:mt-6 sm:gap-4 sm:px-4">
                <div className="flex h-9 w-7 items-center justify-center rounded-sm bg-red-600 text-[10px] font-bold text-base-white">
                  PDF
                </div>
                <div>
                  <div className="font-tagline text-[15px] text-primary sm:text-[16px]">Kalender Akademik UI</div>
                  <div className="font-tagline text-[14px] text-copy-soft">Tahun Akademik 2025/2026</div>
                </div>
              </div>

              <button
                type="button"
                className="mt-7 inline-flex h-[50px] w-full items-center justify-center gap-3 rounded-[14px] bg-cta px-5 font-tagline text-[16px] font-semibold text-black shadow-[0_8px_22px_rgba(252,194,2,0.26)] sm:mt-10 sm:h-[56px] sm:rounded-[16px] sm:px-6 sm:text-[18px]"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </article>

            <article className="rounded-[18px] bg-[#f9f5e2] p-5 shadow-[0_4px_17px_rgba(0,0,0,0.15)] sm:rounded-[20px] sm:p-7">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-cta sm:h-14 sm:w-14 sm:rounded-[16px]">
                  <ShieldAlert className="h-7 w-7 text-primary sm:h-8 sm:w-8" />
                </div>
                <div>
                  <div className="font-body text-[12px] uppercase tracking-[0.08em] text-copy-soft">
                    Penting
                  </div>
                  <div className="font-tagline text-[18px] text-primary sm:text-[20px]">Disclaimer Internal</div>
                </div>
              </div>

              <div className="mt-5 rounded-[10px] border border-cta bg-primary p-4 sm:mt-6 sm:p-5">
                <p className="font-tagline text-[13px] leading-5 text-base-white sm:text-[14px]">
                  Materi ini hanya untuk kepentingan internal akademik mahasiswa Ekstensi FEB UI. Dilarang keras mendistribusikan atau menggunakan untuk kepentingan komersial.
                </p>
              </div>

              <ul className="mt-5 list-disc space-y-1 pl-5 font-tagline text-[14px] text-primary sm:mt-6 sm:text-[15px]">
                <li>Gunakan hanya untuk keperluan belajar pribadi</li>
                <li>Hargai karya intelektual dosen dan rekan mahasiswa</li>
                <li>Laporkan penyalahgunaan ke tim DIKTI</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="bg-base-cream px-4 py-9 sm:px-6 sm:py-11 lg:px-8 lg:py-12">
          <div className="mx-auto max-w-[1184px]">
            <SectionHeader
              eyebrow="Academic Hub"
              title="Repository Bahan Kuliah"
              description="Akses folder Google Drive resmi untuk setiap angkatan dan program studi"
              align="center"
            />

            <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2">
              <RepositoryCard title="Akuntansi" years={["2024", "2025", "2026"]} tone="yellow" />
              <RepositoryCard title="Manajemen" years={["2024", "2025", "2026"]} tone="blue" />
            </div>
          </div>
        </section>

        <section className="bg-base-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto max-w-[1246px]">
            <SectionHeader
              eyebrow="Layanan Eksklusif"
              title="Layanan Penunjang Digital"
              description="Tingkatkan produktivitas akademikmu dengan akses eksklusif"
            />

            <div className="mt-6 grid gap-5 sm:mt-8 sm:gap-6 lg:grid-cols-2">
              <article className="rounded-[18px] border-[3px] border-[#8b5cf6] bg-base-white p-5 shadow-[0_4px_17px_rgba(0,0,0,0.12)] sm:rounded-[20px] sm:p-7">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#f3e8ff] sm:h-14 sm:w-14 sm:rounded-[16px]">
                    <Palette className="h-6 w-6 text-[#8b5cf6] sm:h-7 sm:w-7" />
                  </div>
                  <div>
                    <h3 className="font-tagline text-[18px] font-bold text-black sm:text-[20px]">
                      Canva Pro Ekstensi
                    </h3>
                    <p className="mt-2 max-w-[360px] font-body text-[15px] leading-6 text-copy-muted sm:text-[16px]">
                      Akses lisensi kolektif Canva Pro untuk kebutuhan presentasi dan desain tugas kuliah.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-5 inline-flex h-[48px] min-w-[200px] items-center justify-center gap-3 rounded-[14px] bg-[#8b5cf6] px-6 font-tagline text-[16px] font-semibold text-base-white shadow-[0_8px_22px_rgba(139,92,246,0.28)] sm:mt-6 sm:h-[56px] sm:min-w-[220px] sm:rounded-[16px] sm:px-7 sm:text-[18px]"
                >
                  Daftar Sekarang
                </button>
              </article>

              <article className="rounded-[18px] border-[3px] border-[#5b8def] bg-base-white p-5 shadow-[0_4px_17px_rgba(0,0,0,0.12)] sm:rounded-[20px] sm:p-7">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#eff6ff] sm:h-14 sm:w-14 sm:rounded-[16px]">
                    <Sparkles className="h-6 w-6 text-[#3b82f6] sm:h-7 sm:w-7" />
                  </div>
                  <div>
                    <h3 className="font-tagline text-[18px] font-bold text-black sm:text-[20px]">
                      Gemini Advanced
                    </h3>
                    <p className="mt-2 max-w-[360px] font-body text-[15px] leading-6 text-copy-muted sm:text-[16px]">
                      Gabung slot family sharing untuk akses AI Gemini Advanced sebagai asisten riset dan belajar.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-5 inline-flex h-[48px] min-w-[200px] items-center justify-center gap-3 rounded-[14px] bg-black px-6 font-tagline text-[16px] font-semibold text-base-white shadow-[0_8px_22px_rgba(0,0,0,0.18)] sm:mt-6 sm:h-[56px] sm:min-w-[220px] sm:rounded-[16px] sm:px-7 sm:text-[18px]"
                >
                  Gabung Slot
                </button>
              </article>
            </div>
          </div>
        </section>

        <section className="border-y border-panel-border bg-surface-muted px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1294px]">
            <SectionHeader eyebrow="Playlist" title="Extensipedia Youtube" align="center" />

            <div className="mx-auto mt-6 max-w-[1620px] overflow-hidden rounded-[20px] border border-panel-border bg-panel-bg shadow-[0_8px_28px_rgba(3,57,93,0.08)] sm:mt-10 sm:rounded-[28px]">
              {youtubeEmbedUrl ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={youtubeEmbedUrl}
                    title="Extensipedia Youtube"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="flex aspect-video items-center justify-center">
                  <div className="flex flex-col items-center gap-4 text-copy-soft">
                    <Youtube className="h-14 w-14 text-primary" />
                    <p className="font-tagline text-[18px]">
                      Playlist Youtube belum tersedia.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
