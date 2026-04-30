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
import { SectionHeader } from "@/components/about-page/SectionHeader";
import { CountdownCard } from "@/components/hub-page/CountdownCard";
import { HeroBanner } from "@/components/hub-page/HeroBanner";
import { RepositoryCard } from "@/components/hub-page/RepositoryCard";
import {
  getAcademicCountdowns,
  getAcademicDigitalResources,
  getAcademicQuickDownloads,
  getAcademicRepository,
  getAcademicYoutube,
  getFirstFilledString,
  getFirstResolvedUrl,
  resolveMediaUrl,
  type AcademicCountdown,
  type AcademicDigitalResources,
  type AcademicQuickDownload,
  type AcademicRepositoryMaterial,
  type AcademicYoutubeSection,
} from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Akademik Hub | Extensipedia",
};

export const revalidate = 120;

type DigitalServiceCard = {
  key: string;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
  borderColor: string;
  iconBackground: string;
  actionBackground: string;
  icon: "canva" | "gemini";
};

function ArrowMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaletteMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 41 41" fill="none" aria-hidden="true">
      <path
        d="M20.5 5.2c-8.5 0-15.3 6.2-15.3 13.9 0 4.6 3.2 8.3 7.1 8.3h2.1c1.1 0 2 .9 2 2 0 3 2.2 5.5 5 5.5 8 0 14.4-6 14.4-13.4C35.8 12.5 29 5.2 20.5 5.2Z"
        stroke="#833AF0"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <circle cx="14.2" cy="15.1" r="1.7" fill="#833AF0" />
      <circle cx="22.2" cy="12.6" r="1.7" fill="#833AF0" />
      <circle cx="26.4" cy="19.6" r="1.7" fill="#833AF0" />
      <circle cx="16.7" cy="22.5" r="1.7" fill="#833AF0" />
    </svg>
  );
}

function SparkleMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 41 41" fill="none" aria-hidden="true">
      <path
        d="M20.5 8.2L23.9 16.8L32.5 20.2L23.9 23.6L20.5 32.2L17.1 23.6L8.5 20.2L17.1 16.8L20.5 8.2Z"
        stroke="#5182ED"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M30.2 8.2L31.4 11.2L34.5 12.4L31.4 13.6L30.2 16.6L29 13.6L26 12.4L29 11.2L30.2 8.2Z"
        fill="#5182ED"
      />
      <path
        d="M11.8 26.6L12.7 28.8L14.9 29.7L12.7 30.6L11.8 32.8L10.9 30.6L8.7 29.7L10.9 28.8L11.8 26.6Z"
        fill="#5182ED"
      />
    </svg>
  );
}

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

function buildDigitalServiceCards(
  resources: AcademicDigitalResources | null,
): DigitalServiceCard[] {
  if (!resources) {
    return [];
  }

  const canvaHref = getFirstResolvedUrl(resources, [
    "canva_pro",
    "canva_pro_ekstensi",
    "canva_pro_url",
    "canva_link",
    "canva_url",
    "canva_access_url",
    "canva_registration_url",
  ]);
  const geminiHref = getFirstResolvedUrl(resources, [
    "gemini_advanced",
    "gemini_advanced_url",
    "gemini_link",
    "gemini_url",
    "gemini_access_url",
    "gemini_registration_url",
  ]);

  return [
    canvaHref
      ? {
          key: "canva",
          title:
            getFirstFilledString(resources, [
              "canva_title",
              "canva_pro_title",
              "canva_pro_ekstensi_title",
            ]) ??
            "Canva Pro Ekstensi",
          description:
            getFirstFilledString(resources, [
              "canva_description",
              "canva_pro_description",
              "canva_pro_ekstensi_description",
            ]) ??
            "Akses lisensi kolektif Canva Pro untuk kebutuhan presentasi dan desain tugas kuliah.",
          href: canvaHref,
          actionLabel: "Daftar Sekarang",
          borderColor: "#833af0",
          iconBackground: "#faf5ff",
          actionBackground: "linear-gradient(90deg, #823cf8 0%, #9747ff 100%)",
          icon: "canva",
        }
      : null,
    geminiHref
      ? {
          key: "gemini",
          title:
            getFirstFilledString(resources, [
              "gemini_title",
              "gemini_advanced_title",
            ]) ?? "Gemini Advanced",
          description:
            getFirstFilledString(resources, [
              "gemini_description",
              "gemini_advanced_description",
            ]) ??
            "Gabung slot family sharing untuk akses AI Gemini Advanced sebagai asisten riset dan belajar.",
          href: geminiHref,
          actionLabel: "Gabung Slot",
          borderColor: "#5182ed",
          iconBackground: "#eff6ff",
          actionBackground: "#000",
          icon: "gemini",
        }
      : null,
  ].filter((item): item is DigitalServiceCard => item !== null);
}

export default async function AkademikPage() {
  let youtubeSection: AcademicYoutubeSection | null = null;
  let countdownItems: AcademicCountdown[] = [];
  let quickDownloads: AcademicQuickDownload[] = [];
  let digitalResources: AcademicDigitalResources | null = null;
  let repository: {
    akuntansi: AcademicRepositoryMaterial[];
    manajemen: AcademicRepositoryMaterial[];
  } = {
    akuntansi: [],
    manajemen: [],
  };

  const [
    youtubeResult,
    countdownResult,
    quickDownloadResult,
    repositoryResult,
    digitalResourcesResult,
  ] = await Promise.allSettled([
    getAcademicYoutube(),
    getAcademicCountdowns({ page_size: 10, ordering: "display_order,target_datetime" }),
    getAcademicQuickDownloads({ page_size: 10, ordering: "display_order,title" }),
    getAcademicRepository(),
    getAcademicDigitalResources(),
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

  if (digitalResourcesResult.status === "fulfilled") {
    digitalResources = digitalResourcesResult.value.data;
  }

  const primaryDownload = quickDownloads[0] ?? null;
  const digitalServiceCards = buildDigitalServiceCards(digitalResources);

  return (
    <div className="min-h-screen bg-base-white text-primary">
      <ScrollReset />
      <Navbar />

      <main>
        <HeroBanner
          title="Akademik Hub"
          description="Pusat sumber daya akademik terpadu untuk mahasiswa Program Ekstensi Fakultas Ekonomi dan Bisnis Universitas Indonesia. Akses bahan kuliah, informasi kompetisi, dan layanan aspirasi dalam satu platform."
          backgroundImage="/headers/header-akademik.jpg"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Akademik" },
          ]}
        />

        <section className="bg-base-white px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10">
          <div className="mx-auto grid max-w-[1246px] gap-4 sm:gap-5 xl:grid-cols-3 xl:gap-6">
            <CountdownCard
              items={countdownItems}
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

        <section className="bg-base-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-[1213px]">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <p
                className="font-tagline text-cta"
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                Layanan Eksklusif
              </p>
              <h2
                className="font-headline text-primary"
                style={{
                  maxWidth: "640px",
                  fontSize: "clamp(34px, 7vw, 44px)",
                  lineHeight: 1,
                }}
              >
                Layanan Penunjang Digital
              </h2>
              <p
                className="font-body text-primary"
                style={{
                  fontSize: "15px",
                  lineHeight: 1.35,
                }}
              >
                Tingkatkan produktivitas akademikmu dengan akses eksklusif
              </p>
            </div>

            {digitalServiceCards.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "24px",
                  marginTop: "32px",
                }}
              >
                {digitalServiceCards.map((card) => (
                  <article
                    key={card.key}
                    className="bg-base-white"
                    style={{
                      flex: "1 1 300px",
                      minHeight: "170px",
                      borderRadius: "16px",
                      border: `3px solid ${card.borderColor}`,
                      boxShadow: "0 4px 8.5px rgba(0,0,0,0.15)",
                      padding: "20px",
                    }}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "16px",
                          backgroundColor: card.iconBackground,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {card.icon === "canva" ? <PaletteMark /> : <SparkleMark />}
                      </div>

                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <h3
                          className="font-tagline"
                          style={{
                            width: "100%",
                            maxWidth: "289px",
                            color: "#000",
                            fontSize: "22px",
                            fontWeight: 450,
                            lineHeight: 1,
                          }}
                        >
                          {card.title}
                        </h3>
                        <p
                          className="font-body"
                          style={{
                            maxWidth: "423px",
                            color: "#616161",
                            fontSize: "15px",
                            lineHeight: 1.3,
                          }}
                        >
                          {card.description}
                        </p>

                        <a
                          href={card.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-tagline"
                          style={{
                            marginTop: "auto",
                            width: "min(240px, 100%)",
                            height: "44px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            borderRadius: "10px",
                            background: card.actionBackground,
                            color: "#fff",
                            fontSize: "18px",
                            fontWeight: 450,
                            lineHeight: 1,
                          }}
                        >
                          {card.actionLabel}
                          <ArrowMark />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-[20px] border border-dashed border-panel-border bg-surface-subtle px-6 py-12 text-center">
                <p className="font-headline text-[28px] text-primary">
                  Layanan digital belum aktif.
                </p>
                <p className="mx-auto mt-3 max-w-[620px] text-[15px] leading-7 text-copy-soft">
                  Card Canva Pro dan Gemini tidak ditampilkan karena backend belum
                  mengirim link aktif pada singleton `academic/digital-resources`.
                </p>
              </div>
            )}
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
