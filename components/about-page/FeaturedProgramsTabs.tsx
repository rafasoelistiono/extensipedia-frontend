"use client";

import {
  AppWindow,
  Briefcase,
  Camera,
  Clock,
  FileText,
  Heart,
  Link as LinkIcon,
  Megaphone,
  Palette,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { ProgramCard } from "@/components/about-page/ProgramCard";

const currentPageProgramHref = "#program-kerja-unggulan";

const programHubs = [
  {
    label: "Akademik & Teknologi",
    fullLabel: "Akademik & Teknologi",
    department: "DIKTI",
    programs: [
      {
        title: "Extensipedia",
        description: "Website pusat materi dan bank soal terpadu.",
        icon: AppWindow,
        href: currentPageProgramHref,
      },
      {
        title: "Study Boost & Exam Blast",
        description: "Tutorial menjelang ujian dan sistem peringatan jadwal.",
        icon: Clock,
      },
      {
        title: "Fun Enlightenment",
        description: 'Workshop AI Mastery dan strategi "SIAK War".',
        icon: Sparkles,
      },
    ],
  },
  {
    label: "Karir, Bisnis & Relasi",
    fullLabel: "Karir, Bisnis & Relasi",
    department: "PENGKAR, BISMIT, EXTERN",
    programs: [
      {
        title: "Career Catalyst",
        description:
          "Bimbingan sertifikasi dan persiapan dunia kerja profesional.",
        icon: TrendingUp,
      },
      {
        title: "EXPLORE",
        description:
          "Forum silaturahmi dan networking strategis dengan alumni.",
        icon: LinkIcon,
      },
      {
        title: "Business Partnership",
        description:
          "Pengelolaan dana usaha dan kemitraan eksternal.",
        icon: Briefcase,
      },
    ],
  },
  {
    label: "Advokasi & Isu Strategis",
    fullLabel: "Advokasi & Isu Strategis",
    department: "INADVOK, KASTRAT",
    programs: [
      {
        title: "Jaring Aspirasi",
        description:
          "Kanal pengaduan masalah akademik dan fasilitas kampus.",
        icon: Megaphone,
      },
      {
        title: "Kajian Strategis",
        description:
          "Analisis kritis isu sosial-ekonomi dan kebijakan kampus.",
        icon: FileText,
      },
      {
        title: "Bincang Sekma",
        description:
          "Forum diskusi langsung dengan Sekretariat PE FEB UI.",
        icon: Users,
      },
    ],
  },
  {
    label: "Komunitas & Pengabdian",
    fullLabel: "Komunitas & Pengabdian",
    department: "MINBAK, PENGMAS, HPD",
    programs: [
      {
        title: "REACH Project",
        description:
          "Aksi sosial dan pengabdian masyarakat yang berdampak.",
        icon: Heart,
      },
      {
        title: "Talent Interest",
        description:
          "Wadah pengembangan hobi, olahraga, dan kreativitas mahasiswa.",
        icon: Palette,
      },
      {
        title: "Branding & Dokumentasi",
        description:
          "Pengelolaan visual dan identitas publik kabinet.",
        icon: Camera,
      },
    ],
  },
];

export function FeaturedProgramsTabs() {
  const [activeHubIndex, setActiveHubIndex] = useState(0);

  const activeHub = programHubs[activeHubIndex];

  return (
    <div className="mt-6">
      <div
        className="flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:gap-x-5 sm:gap-y-4 sm:overflow-visible"
        role="tablist"
        aria-label="Hub Program Kerja Unggulan"
      >
        {programHubs.map((hub, index) => {
          const isActive = activeHubIndex === index;

          return (
            <button
              key={hub.label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveHubIndex(index)}
              className={[
                "shrink-0 rounded-full border px-5 py-3 text-left font-tagline text-[15px] font-semibold leading-none transition-all sm:px-6 sm:text-[17px]",
                isActive
                  ? "border-cta bg-cta text-primary shadow-[0_8px_22px_rgba(252,194,2,0.35)]"
                  : "border-primary/20 bg-base-white text-primary hover:border-primary hover:bg-surface-muted",
              ].join(" ")}
            >
              {hub.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:mt-10 sm:gap-[29px] lg:grid-cols-3">
        {activeHub.programs.map((program) => (
          <ProgramCard
            key={program.title}
            href={program.href ?? currentPageProgramHref}
            {...program}
          />
        ))}
      </div>
    </div>
  );
}
