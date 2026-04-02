import type { Metadata } from "next";
import {
  CalendarDays,
  Download,
  ShieldAlert,
  Youtube,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReset } from "@/components/ScrollReset";
import { CountdownCard } from "@/components/hub-page/CountdownCard";
import { RepositoryCard } from "@/components/hub-page/RepositoryCard";
import { HeroBanner } from "@/components/hub-page/HeroBanner";
import { SectionHeader } from "@/components/about-page/SectionHeader";
import {
  getAcademicCountdowns,
  getAcademicQuickDownloads,
  getAcademicRepository,
  getAcademicYoutube,
  resolveMediaUrl,
  type AcademicCountdown,
  type AcademicQuickDownload,
  type AcademicRepositoryMaterial,
  type AcademicYoutubeSection,
} from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Akademik Hub | Extensipedia",
};

function mapRepositoryItems(items: AcademicRepositoryMaterial[]) {
  return items
    .slice()
    .sort((left, right) => left.display_order - right.display_order)
    .map((item) => ({
      id: item.id,
      title: item.title,
      href: item.google_drive_link,
    }));
}

function getDownloadLabel(item: AcademicQuickDownload) {
  return item.resource_type === "file" ? "File" : "Link";
}

export default async function AkademikPage() {
  let youtubeSection: AcademicYoutubeSection | null = null;
  let countdownItems: AcademicCountdown[] = [];
  let quickDownloads: AcademicQuickDownload[] = [];
  let repository: {
    akuntansi: AcademicRepositoryMaterial[];
    manajemen: AcademicRepositoryMaterial[];
  } = {
    akuntansi: [],
    manajemen: [],
  };

  const [youtubeResult, countdownResult, quickDownloadResult, repositoryResult] =
    await Promise.allSettled([
      getAcademicYoutube(),
      getAcademicCountdowns({ page_size: 10, ordering: "display_order,target_datetime" }),
      getAcademicQuickDownloads({ page_size: 10, ordering: "display_order,title" }),
      getAcademicRepository(),
    ]);

  if (youtubeResult.status === "fulfilled") {
    youtubeSection = youtubeResult.value.data;
  }

  if (countdownResult.status === "fulfilled") {
    countdownItems = countdownResult.value.data.items
      .slice()
      .sort((left, right) => left.display_order - right.display_order);
  }

  if (quickDownloadResult.status === "fulfilled") {
    quickDownloads = quickDownloadResult.value.data.items
      .slice()
      .sort((left, right) => left.display_order - right.display_order);
  }

  if (repositoryResult.status === "fulfilled") {
    repository = repositoryResult.value.data;
  }

  const featuredCountdown = countdownItems[0] ?? null;
  const primaryDownload = quickDownloads[0] ?? null;

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
            <CountdownCard
              item={featuredCountdown}
              relatedItems={countdownItems.slice(1)}
            />

            <article className="rounded-[18px] bg-base-white p-5 shadow-[0_4px_17px_rgba(0,0,0,0.15)] sm:rounded-[20px] sm:p-7">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-primary sm:h-14 sm:w-14 sm:rounded-[16px]">
                  <CalendarDays className="h-7 w-7 text-cta sm:h-8 sm:w-8" />
                </div>
                <div>
                  <div className="font-body text-[12px] uppercase tracking-[0.08em] text-copy-soft">
                    Quick Download
                  </div>
                  <div className="font-tagline text-[18px] text-primary sm:text-[20px]">
                    {primaryDownload?.title ?? "Belum ada file aktif"}
                  </div>
                </div>
              </div>

              <p className="mt-5 font-tagline text-[14px] text-primary sm:mt-6 sm:text-[15px]">
                {primaryDownload
                  ? `Unduh atau buka resource akademik dari backend. Tipe resource: ${getDownloadLabel(
                      primaryDownload,
                    )}.`
                  : "Saat ini quick download belum tersedia dari backend."}
              </p>

              <div className="mt-5 space-y-3 sm:mt-6">
                {quickDownloads.length > 0 ? (
                  quickDownloads.slice(0, 3).map((item) => (
                    <a
                      key={item.id}
                      href={resolveMediaUrl(item.resource_url) ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-[10px] border border-black/20 px-3 py-3 transition hover:border-primary/40 sm:gap-4 sm:px-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-red-600 text-[10px] font-bold text-base-white">
                        {item.resource_type === "file" ? "FILE" : "LINK"}
                      </div>
                      <div className="min-w-0">
                        <div className="line-clamp-1 font-tagline text-[15px] text-primary sm:text-[16px]">
                          {item.title}
                        </div>
                        <div className="font-tagline text-[14px] text-copy-soft">
                          {item.resource_type === "file"
                            ? "Resource file"
                            : "External resource"}
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="rounded-[12px] border border-dashed border-panel-border px-4 py-6 text-center font-tagline text-[14px] text-copy-soft">
                    Quick download belum tersedia.
                  </div>
                )}
              </div>

              <a
                href={primaryDownload ? resolveMediaUrl(primaryDownload.resource_url) ?? "#" : "#"}
                target={primaryDownload ? "_blank" : undefined}
                rel={primaryDownload ? "noreferrer" : undefined}
                aria-disabled={!primaryDownload}
                className={[
                  "mt-7 inline-flex h-[50px] w-full items-center justify-center gap-3 rounded-[14px] px-5 font-tagline text-[16px] font-semibold sm:mt-10 sm:h-[56px] sm:rounded-[16px] sm:px-6 sm:text-[18px]",
                  primaryDownload
                    ? "bg-cta text-black shadow-[0_8px_22px_rgba(252,194,2,0.26)]"
                    : "cursor-not-allowed bg-[#e5e7eb] text-[#94a3b8]",
                ].join(" ")}
              >
                <Download className="h-4 w-4" />
                {primaryDownload
                  ? primaryDownload.resource_type === "file"
                    ? "Download Resource"
                    : "Buka Resource"
                  : "Belum Ada Resource"}
              </a>
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
                  <div className="font-tagline text-[18px] text-primary sm:text-[20px]">
                    Disclaimer Internal
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[10px] border border-cta bg-primary p-4 sm:mt-6 sm:p-5">
                <p className="font-tagline text-[13px] leading-5 text-base-white sm:text-[14px]">
                  Materi ini hanya untuk kepentingan internal akademik mahasiswa
                  Ekstensi FEB UI. Dilarang keras mendistribusikan atau
                  menggunakan untuk kepentingan komersial.
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
              description="Akses folder Google Drive resmi untuk setiap section bahan kuliah."
              align="center"
            />

            <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-2">
              <RepositoryCard
                title="Akuntansi"
                items={mapRepositoryItems(repository.akuntansi)}
                tone="yellow"
              />
              <RepositoryCard
                title="Manajemen"
                items={mapRepositoryItems(repository.manajemen)}
                tone="blue"
              />
            </div>
          </div>
        </section>

        <section className="border-y border-panel-border bg-surface-muted px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1294px]">
            <SectionHeader
              eyebrow="Playlist"
              title={youtubeSection?.title ?? "Extensipedia Youtube"}
              description={
                youtubeSection?.description ?? "Playlist YouTube belum tersedia."
              }
              align="center"
            />

            <div className="mx-auto mt-6 max-w-[1620px] overflow-hidden rounded-[20px] border border-panel-border bg-panel-bg shadow-[0_8px_28px_rgba(3,57,93,0.08)] sm:mt-10 sm:rounded-[28px]">
              {youtubeSection?.embed_url ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={youtubeSection.embed_url}
                    title={youtubeSection.title}
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
