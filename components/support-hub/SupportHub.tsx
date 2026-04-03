import Link from "next/link";
import {
  ArrowRight,
  BadgeAlert,
  BriefcaseBusiness,
  FileSpreadsheet,
  Megaphone,
  MessageCircleMore,
  ShieldCheck,
  Ticket,
} from "lucide-react";
import { BreadcrumbTrail } from "@/components/BreadcrumbTrail";
import { AspirationSubmitForm } from "@/components/support-hub/AspirationSubmitForm";
import { FeaturedAspirationsSection } from "@/components/support-hub/FeaturedAspirationsSection";
import { TicketTracker } from "@/components/support-hub/TicketTracker";
import type { FeaturedAspiration } from "@/lib/public-api";

type SupportHubProps = {
  activeTab: "aspirasi" | "lacak";
  aspirations: FeaturedAspiration[];
};

const supportHighlights = [
  {
    title: "Zero-Friction",
    description: "Form tanpa login SIAK untuk aksesibilitas 100%",
    icon: ShieldCheck,
    iconTone: "bg-[#e5ebee] text-primary",
  },
  {
    title: "Auto Ticket ID",
    description: "ID tiket otomatis untuk pelacakan transparan",
    icon: Ticket,
    iconTone: "bg-[#fbf5e1] text-[#b48a00]",
  },
  {
    title: "5 Status Tracking",
    description: "Dari Submitted hingga Resolved secara transparan",
    icon: BadgeAlert,
    iconTone: "bg-[#f0fdf4] text-[#15803d]",
  },
] as const;

const policyResources = [
  {
    title: "Siak WAR",
    description:
      "Strategi dan tips jitu untuk memenangkan perang pengambilan mata kuliah di SIAK NG.",
    topTone: "bg-primary",
    iconTone: "bg-[#4451b4] text-base-white",
    icon: FileSpreadsheet,
  },
  {
    title: "Cicilan UKT",
    description:
      "Prosedur lengkap pengajuan cicilan UKT, syarat dokumen, dan timeline pengajuan.",
    topTone: "bg-[#0a5a8a]",
    iconTone: "bg-base-white text-cta",
    icon: BriefcaseBusiness,
  },
  {
    title: "Alur SKPI",
    description:
      "Panduan lengkap pengajuan Surat Keterangan Pendamping Ijazah (SKPI) dan persyaratannya.",
    topTone: "bg-primary",
    iconTone: "bg-base-white text-primary",
    icon: BadgeAlert,
  },
] as const;

function HeroTab({
  href,
  active,
  icon: Icon,
  label,
}: {
  href: string;
  active: boolean;
  icon: typeof Megaphone;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex h-11 items-center justify-center gap-3 rounded-[18px] border px-4 font-tagline text-[14px] font-semibold transition-all sm:h-14 sm:rounded-[20px] sm:px-6 sm:text-[18px]",
        active
          ? "border-cta bg-cta text-primary shadow-[0_8px_22px_rgba(252,194,2,0.28)]"
          : "border-[#275574] bg-[#275574] !text-base-white shadow-[0_8px_22px_rgba(3,57,93,0.22)] hover:border-[#356583] hover:bg-[#356583] [&_svg]:!text-base-white",
      ].join(" ")}
    >
      <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
      {label}
    </Link>
  );
}

function SupportInfoCard() {
  return (
    <article className="rounded-[20px] border border-base-grey bg-base-white p-5 shadow-[0_4px_17px_rgba(0,0,0,0.12)] sm:p-6">
      <h3 className="font-headline text-[22px] leading-none text-primary">
        Tentang Support Hub
      </h3>

      <div className="mt-5 space-y-4">
        {supportHighlights.map(({ title, description, icon: Icon, iconTone }) => (
          <div key={title} className="flex items-start gap-4">
            <div
              className={[
                "flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[14px]",
                iconTone,
              ].join(" ")}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-tagline text-[16px] font-bold text-primary">{title}</div>
              <p className="mt-1 text-[14px] leading-6 text-copy-muted">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function SupportContactCard() {
  return (
    <article className="rounded-[20px] bg-primary p-5 text-base-white shadow-[0_4px_17px_rgba(0,0,0,0.18)] sm:p-6">
      <h3 className="font-headline text-[22px] leading-none text-base-white">
        Kontak INADVOK
      </h3>
      <p className="mt-4 text-[14px] leading-6 text-base-white/70">
        Butuh bantuan segera? Hubungi tim Departemen Internal & Advokasi
        Mahasiswa BEM PE FEB UI.
      </p>

      <div className="mt-5 space-y-3">
        <a
          href="#"
          className="flex h-10 items-center justify-center gap-2 rounded-[10px] bg-cta px-4 font-tagline text-[14px] font-bold text-primary transition hover:brightness-95"
        >
          <MessageCircleMore className="h-4 w-4" />
          WhatsApp INADVOK
        </a>
        <a
          href="https://www.instagram.com/bempefebui/"
          target="_blank"
          rel="noreferrer"
          className="flex h-10 items-center justify-center gap-2 rounded-[10px] bg-[#1d4d6e] px-4 font-tagline text-[14px] font-bold text-base-white transition hover:bg-[#255c82]"
        >
          <Megaphone className="h-4 w-4" />
          Instagram BEM PE FEB UI
        </a>
      </div>
    </article>
  );
}

function PolicyCard({
  title,
  description,
  topTone,
  iconTone,
  icon: Icon,
}: (typeof policyResources)[number]) {
  return (
    <article className="overflow-hidden rounded-[20px] border border-base-grey bg-base-white shadow-[0_4px_17px_rgba(0,0,0,0.08)]">
      <div className={["relative h-[72px]", topTone].join(" ")}>
        <div
          className={[
            "absolute left-6 top-[52px] flex h-[52px] w-[52px] items-center justify-center rounded-[13px] shadow-[0_4px_17px_rgba(0,0,0,0.18)]",
            iconTone,
          ].join(" ")}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>

      <div className="px-6 pb-8 pt-10">
        <h3 className="font-headline text-[22px] leading-none text-primary">{title}</h3>
        <p className="mt-3 text-[14px] leading-6 text-copy-soft">{description}</p>
        <a
          href="#"
          className="mt-5 inline-flex items-center gap-2 font-tagline text-[15px] font-semibold text-primary transition hover:text-cta"
        >
          Baca Panduan
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export function SupportHub({ activeTab, aspirations }: SupportHubProps) {
  const isTicketTab = activeTab === "lacak";

  return (
    <main>
      <section className="relative overflow-hidden bg-primary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/headers/header-advokasi.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="page-hero-tint absolute inset-0" />
        <div className="absolute inset-0 bg-primary/58" />

        <div className="relative mx-auto max-w-[1440px] px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 lg:pb-20">
          <div className="mx-auto max-w-[1280px]">
            <BreadcrumbTrail
              items={[
                { label: "Beranda", href: "/" },
                { label: "Kompetensi & Karir", href: "/kompetensi-karir" },
                { label: isTicketTab ? "Lacak Tiket" : "Sampaikan Aspirasi" },
              ]}
            />

            <h1 className="mt-4 font-headline text-[34px] leading-none text-base-white sm:mt-5 sm:text-[56px] lg:text-[64px]">
              Support Hub
            </h1>

            <p className="mt-4 max-w-[992px] text-[15px] leading-[1.65] text-[#b4c4cf] sm:text-[20px]">
              Layanan advokasi dan literasi kebijakan BEM PE FEB UI. Sampaikan
              aspirasimu atau lacak status tiket pengaduanmu secara transparan.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
              <HeroTab
                href="/advokasi"
                active={!isTicketTab}
                icon={Megaphone}
                label="Sampaikan Aspirasi"
              />
              <HeroTab
                href="/advokasi?tab=lacak"
                active={isTicketTab}
                icon={Ticket}
                label="Lacak Tiket"
              />
            </div>
          </div>
        </div>
      </section>

      {!isTicketTab ? (
        <FeaturedAspirationsSection aspirations={aspirations} />
      ) : null}

      <section className="bg-base-white px-4 pb-14 pt-4 sm:px-6 sm:pb-16 sm:pt-6 lg:px-8">
        <div className="mx-auto grid max-w-[1287px] gap-6 lg:grid-cols-[minmax(0,788px)_minmax(0,448px)] lg:items-start">
          <div>{isTicketTab ? <TicketTracker /> : <AspirationSubmitForm />}</div>

          <div className="space-y-6">
            <SupportInfoCard />
            <SupportContactCard />
          </div>
        </div>
      </section>

      <section className="bg-base-white px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-[1287px]">
          <div className="section-eyebrow">Hak &amp; Prosedur</div>
          <h2 className="section-title mt-2 text-[30px] leading-none sm:text-[42px]">
            Advografis &amp; Literasi Kebijakan
          </h2>
          <p className="mt-3 text-[15px] leading-7 text-copy-muted sm:text-[20px]">
            Panduan singkat kebijakan akademik yang wajib kamu tahu
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3 lg:gap-5">
            {policyResources.map((resource) => (
              <PolicyCard key={resource.title} {...resource} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
