import type { Metadata } from "next";
import {
  AppWindow,
  BookMarked,
  Compass,
  HandHeart,
  Handshake,
  ScanSearch,
  Smile,
  Target,
  Users,
} from "lucide-react";
import { BreadcrumbTrail } from "@/components/BreadcrumbTrail";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReset } from "@/components/ScrollReset";
import { OrganizationCarousel } from "@/components/about-page/OrganizationCarousel";
import { ProgramCard } from "@/components/about-page/ProgramCard";
import { SectionHeader } from "@/components/about-page/SectionHeader";
import { getCabinetCalendar } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Tentang Kami | Extensipedia",
};

const heroBackground = "/about/hero-bg.png";

const leaderPhoto = "/about/leader-photo.png";

const organizationMembers = [
  {
    name: "Daniel Matthew",
    role: "Ketua BEM",
    unit: "BEM PE FEB UI",
    image: "/about/daniel-matthew.png",
  },
  {
    name: "Annisa Mahdatilla",
    role: "Wakil Ketua BEM",
    unit: "BEM PE FEB UI",
    image: "/about/annisa-mahdatilla.png",
  },
  {
    name: "Syamsul Bachri",
    role: "Kepala Biro",
    unit: "SPI",
    image: "/about/syamsul-bachri.png",
  },
  {
    name: "Ikyuwan Putrinya",
    role: "Sekretaris",
    unit: "Kesekretariatan",
    image: "/about/ikyuwan-putrinya.png",
  },
  {
    name: "Veronika Sagala",
    role: "Bendahara",
    unit: "Keuangan",
    image: "/about/veronika-sagala.png",
  },
  {
    name: "Pradifta Wedi Ananta",
    role: "Kepala Departemen",
    unit: "Hubungan Eksternal",
    image: "/about/pradifta-wedi-ananta.png",
  },
  {
    name: "Cameliah Hamdani",
    role: "Kepala Departemen",
    unit: "Pengembangan Karir",
    image: "/about/cameliah-hamdani.png",
  },
  {
    name: "Ratu Zahra Savira",
    role: "Kepala Departemen",
    unit: "Bisnis & Kemitraan",
    image: "/about/ratu-zahra-savira.png",
  },
  {
    name: "Fadhilah Sophia",
    role: "Kepala Departemen",
    unit: "Pengabdian Masyarakat",
    image: "/about/fadhilah-sophia.png",
  },
  {
    name: "Martin Panolui",
    role: "Kepala Departemen",
    unit: "Minat & Bakat",
    image: "/about/martin-panolui.png",
  },
  {
    name: "Raja Sultan Syah",
    role: "Kepala Departemen",
    unit: "Publikasi & Dokumentasi",
    image: "/about/raja-sultan-syah.png",
  },
];

const kabinetValues = [
  {
    letter: "G",
    title: "Gema",
    description:
      "Melambangkan suara aspirasi mahasiswa yang kami perkuat (gaungkan) agar terdengar dan membawa perubahan.",
    tone: "yellow" as const,
  },
  {
    letter: "C",
    title: "Cita",
    description:
      "Fokus pada impian, target akademik, dan akselerasi karir mahasiswa yang ingin kami wujudkan.",
    tone: "blue" as const,
  },
  {
    letter: "B",
    title: "Bersama",
    description:
      "Menegaskan prinsip inklusivitas dan gotong royong dalam setiap langkah organisasi.",
    tone: "yellow" as const,
  },
];

const missionItems = [
  {
    title: "Komunikasi Aktif",
    description:
      "Membangun jembatan komunikasi aktif antara mahasiswa, alumni, dosen, dan Sekretariat PE FEB UI.",
    icon: Users,
  },
  {
    title: "Pengembangan Kompetensi",
    description:
      "Menyediakan wadah pengembangan kompetensi yang relevan dengan tantangan dunia kerja.",
    icon: BookMarked,
  },
  {
    title: "Kolaborasi Strategis",
    description:
      "Menggalang kolaborasi strategis dengan berbagai pihak internal maupun eksternal.",
    icon: Handshake,
  },
  {
    title: "Budaya Saling Mendukung",
    description: "Menumbuhkan budaya saling mendukung antar mahasiswa.",
    icon: HandHeart,
  },
];

const programTabs = [
  "Akademik & Teknologi",
  "Akademik",
  "Kompetensi & Karir",
  "Advokasi",
];

const programs = [
  {
    title: "Extensipedia",
    description: "Website pusat materi dan bank soal terpadu.",
    icon: AppWindow,
  },
  {
    title: "Study Boost & Exam Blastpedia",
    description: "Tutorial menjelang ujian dan sistem peringatan jadwal.",
    icon: ScanSearch,
  },
  {
    title: "Fun Enlightenment",
    description: 'Workshop AI Mastery dan strategi "SIAK War"',
    icon: Smile,
  },
];

export default async function TentangKamiPage() {
  let cabinetCalendarEmbedUrl: string | null = null;

  try {
    const response = await getCabinetCalendar();
    cabinetCalendarEmbedUrl = response.data.embed_url;
  } catch {
    cabinetCalendarEmbedUrl = null;
  }

  return (
    <div className="min-h-screen bg-base-white text-primary">
      <ScrollReset />
      <Navbar />

      <main>
        <section className="relative overflow-hidden bg-primary">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroBackground}
            alt="Anggota kabinet Gema Cita Bersama"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="page-hero-tint absolute inset-0" />
          <div className="absolute inset-0 bg-primary/48" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,57,93,0.44)_0%,rgba(3,57,93,0.38)_38%,rgba(3,57,93,0.5)_100%)]" />

          <div className="relative mx-auto flex min-h-[320px] w-full max-w-[1440px] items-end px-4 pb-14 pt-16 sm:min-h-[360px] sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 lg:pb-20">
            <div className="mx-auto w-full max-w-[1280px]">
              <BreadcrumbTrail
                items={[
                  { label: "Beranda", href: "/" },
                  { label: "Tentang Kami" },
                ]}
              />
              <h1 className="font-headline text-[34px] leading-none text-base-white sm:mt-5 sm:text-[56px] lg:text-[64px]">
                Tentang Kami
              </h1>
              <p className="mt-4 max-w-[992px] font-body text-[15px] leading-[1.65] text-base-white sm:text-[20px] sm:leading-[1.5]">
                Mengenal lebih dekat lembaga eksekutif mahasiswa yang
                menggerakkan Extensipedia dan melayani seluruh mahasiswa
                Ekstensi FEB UI.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-base-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto grid w-full max-w-[1213px] gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12 lg:px-8">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="section-title text-[30px] leading-none sm:text-[40px] lg:text-[48px]">
                  Mengenal BEM PE FEB UI
                </h2>
                <div className="mt-5 space-y-3 text-justify font-body text-[14px] leading-[1.85] text-copy-muted sm:text-[16px] sm:leading-[1.9]">
                  <p>
                    Badan Eksekutif Mahasiswa Program Ekstensi Fakultas
                    Ekonomi dan Bisnis Universitas Indonesia (BEM PE FEB UI)
                    adalah lembaga eksekutif tertinggi di tingkat program
                    studi. Kami berfungsi sebagai wadah pergerakan,
                    pengembangan diri, dan penyaluran aspirasi mahasiswa
                    Ekstensi FEB UI.
                  </p>
                  <p>
                    Kami berperan sebagai jembatan strategis antara mahasiswa
                    dengan pihak Dekanat, alumni, serta mitra eksternal untuk
                    menciptakan lingkungan akademik yang suportif, inklusif,
                    dan profesional.
                  </p>
                </div>
              </div>

              <div className="grid gap-[15px] min-[420px]:grid-cols-3">
                {[
                  ["12", "DEPARTEMEN"],
                  ["70+", "ANGGOTA AKTIF"],
                  ["50+", "PROGRAM KERJA"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="surface-card flex min-h-[110px] items-center justify-center rounded-[20px] bg-base-white p-4 text-center sm:min-h-[124px] sm:p-5"
                  >
                    <div>
                      <div className="font-headline text-[32px] leading-none text-primary sm:text-[36px]">
                        {value}
                      </div>
                      <div className="mt-3 font-tagline text-[14px] font-semibold text-copy-soft sm:text-[16px]">
                        {label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <article className="relative rounded-[20px] border border-base-grey bg-primary p-5 text-base-white shadow-[0_14px_40px_rgba(3,57,93,0.08)] sm:p-8">
              <div className="mb-5 flex items-center gap-4 sm:mb-6 sm:gap-[18px]">
                <div className="flex h-[74px] w-[74px] items-center justify-center overflow-hidden rounded-[18px] bg-base-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={leaderPhoto}
                    alt="Ketua BEM PE FEB UI 2026"
                    className="h-[100px] w-[100px] object-cover"
                  />
                </div>
                <div>
                  <p className="font-tagline text-[17px] font-bold leading-[1.25] text-base-white sm:text-[19px]">
                    Ketua BEM PE FEB UI 2026
                  </p>
                  <p className="mt-1 font-tagline text-[15px] font-medium text-cta sm:text-[17px]">
                    Kabinet Gema Cita Bersama
                  </p>
                </div>
              </div>

              <div className="space-y-5 font-body text-[14px] leading-[1.9] text-base-white sm:text-[16px] sm:leading-[2.1]">
                <p>
                  &quot;Selamat datang di Extensipedia. Platform ini merupakan
                  bagian dari komitmen kabinet Gema Cita Bersama untuk
                  menyediakan sumber belajar dan informasi yang terintegrasi
                  bagi mahasiswa Program Ekstensi FEB UI. Kami percaya bahwa
                  akses terhadap informasi yang terstruktur dan terpercaya
                  merupakan pondasi penting dalam membangun mahasiswa yang
                  kritis, adaptif, dan berdampak.
                </p>
                <p>
                  Dalam kesempatan ini kami turut mengajak seluruh mahasiswa
                  untuk aktif dalam pengembangan platform ini. Partisipasi dan
                  kolaborasi kalian adalah kunci agar Extensipedia terus
                  relevan, dinamis, dan bermanfaat bagi mahasiswa secara
                  berkelanjutan.&quot;
                </p>
              </div>

              <div className="absolute right-5 top-5 text-cta sm:right-6 sm:top-6">
                <span className="font-headline text-[46px] leading-none sm:text-[54px]">
                  &rdquo;
                </span>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-base-cream py-[60px]">
          <div className="mx-auto w-full max-w-[1213px] px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Kabinet 2026"
              title="BEM PE FEB UI 2026"
              align="center"
            />

            <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-[29px] lg:grid-cols-3">
              {kabinetValues.map((item) => (
                <article
                  key={item.letter}
                  className={[
                    "min-h-[210px] rounded-[17px] bg-base-white px-5 py-6 sm:min-h-[230px] sm:px-7 sm:py-[30px]",
                    item.tone === "blue"
                      ? "border-2 border-primary shadow-[0_3px_11px_rgba(3,57,93,0.35)]"
                      : "border-2 border-cta shadow-[0_3px_11px_rgba(252,194,2,0.35)]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "flex h-[65px] w-[65px] items-center justify-center rounded-[17px]",
                      item.tone === "blue"
                        ? "bg-cta text-primary"
                        : "bg-primary text-cta",
                    ].join(" ")}
                  >
                    <span className="font-headline text-[44px] leading-none">
                      {item.letter}
                    </span>
                  </div>

                  <h3 className="mt-[14px] font-tagline text-[22px] font-bold leading-none text-primary sm:text-[24px]">
                    {item.title}
                  </h3>
                  <p className="mt-[7px] max-w-[310px] font-tagline text-[16px] leading-[1.12] text-copy-muted sm:text-[18px]">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-base-white py-[60px]">
          <div className="mx-auto w-full max-w-[1294px] px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Arah Gerak Kami"
              title="Visi & Misi"
              align="center"
            />

            <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-7 lg:grid-cols-2">
              <article className="rounded-[28px] bg-primary px-6 py-7 text-base-white sm:px-12 sm:py-[52px]">
                <div className="flex items-center gap-4 sm:gap-[30px]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-cta sm:h-20 sm:w-20 sm:rounded-[28px]">
                    <Target
                      className="h-10 w-10 text-primary sm:h-[54px] sm:w-[54px]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="font-tagline text-[32px] font-bold text-base-white sm:text-[41px]">
                    Visi
                  </h3>
                </div>

                <p className="mt-6 max-w-[465px] font-tagline text-[17px] font-medium leading-[1.7] text-left text-base-white sm:mt-12 sm:text-[20px] sm:text-justify">
                  &quot;Mewujudkan BEM yang inklusif, responsif, dan kolaboratif
                  dalam menggemakan cita mahasiswa menuju kesuksesan akademik
                  dan pengembangan karir.&quot;
                </p>
              </article>

              <article className="rounded-[28px] border border-panel-border bg-panel-bg px-6 py-7 sm:px-12 sm:py-[52px]">
                <div className="flex items-center gap-4 sm:gap-[30px]">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-cta sm:h-20 sm:w-20 sm:rounded-[28px]">
                    <Compass
                      className="h-10 w-10 text-primary sm:h-[54px] sm:w-[54px]"
                      strokeWidth={1.75}
                    />
                  </div>
                  <h3 className="font-tagline text-[32px] font-bold text-primary sm:text-[41px]">
                    Misi
                  </h3>
                </div>

                <div className="mt-8 space-y-4">
                  {missionItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="grid grid-cols-[48px_1fr] gap-3 sm:grid-cols-[54px_1fr] sm:gap-4"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-accent-soft sm:h-[54px] sm:w-[54px] sm:rounded-[18px]">
                          <Icon
                            className="h-8 w-8 text-cta"
                            strokeWidth={1.75}
                          />
                        </div>
                        <div>
                          <h4 className="font-tagline text-[16px] font-bold text-primary sm:text-[18px]">
                            {item.title}
                          </h4>
                          <p className="font-tagline text-[15px] leading-[1.12] text-copy-muted sm:text-[18px] sm:leading-[1.05]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-surface-muted py-[60px]">
          <div className="mx-auto w-full max-w-[1213px] px-4 sm:px-6 lg:px-8">
            <OrganizationCarousel members={organizationMembers} />
          </div>
        </section>

        <section className="bg-base-white py-[60px]">
          <div className="mx-auto w-full max-w-[1213px] px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Program Kerja Unggulan"
              title="Hub Program Kerja Unggulan"
            />

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4 sm:gap-x-10">
              {programTabs.map((tab, index) => (
                <div key={tab} className="flex flex-col gap-[5px]">
                  <span
                    className={[
                      "font-tagline text-[18px] font-medium leading-none sm:text-[24px]",
                      index === 0 ? "text-cta-muted" : "text-primary",
                    ].join(" ")}
                  >
                    {tab}
                  </span>
                  {index === 0 ? (
                    <span className="h-1 w-full rounded-[10px] bg-cta shadow-[0_4px_17px_rgba(252,194,2,0.5)]" />
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-[29px] lg:grid-cols-3">
              {programs.map((program) => (
                <ProgramCard key={program.title} {...program} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-base-cream py-[60px]">
          <div className="mx-auto w-full max-w-[1294px] px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Jadwal & Agenda"
              title="Kalender Kabinet"
              description="Pantau jadwal program kerja dan informasi akademik secara langsung"
              align="center"
            />

            <div className="mt-8 overflow-hidden rounded-[28px] border border-panel-border bg-panel-bg">
              {cabinetCalendarEmbedUrl ? (
                <iframe
                  src={cabinetCalendarEmbedUrl}
                  title="Kalender Kabinet BEM PE FEB UI 2026"
                  className="h-[420px] w-full sm:h-[520px] lg:h-[640px]"
                  frameBorder="0"
                  scrolling="no"
                />
              ) : (
                <div className="flex h-[320px] items-center justify-center px-6 text-center font-tagline text-[16px] text-copy-soft sm:h-[420px]">
                  Kalender kabinet belum tersedia.
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
