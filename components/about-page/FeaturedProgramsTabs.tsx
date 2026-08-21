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
import type { AboutTentangKami } from "@/lib/public-api";

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
        linkKey: "extensipedia_link",
      },
      {
        title: "Study Boost & Exam Blast",
        description: "Tutorial menjelang ujian dan sistem peringatan jadwal.",
        icon: Clock,
        linkKey: "study_boost_exam_blast_link",
      },
      {
        title: "Fun Enlightenment",
        description: 'Workshop AI Mastery dan strategi "SIAK War".',
        icon: Sparkles,
        linkKey: "fun_enlightenment_link",
      },
    ],
  },
  {
    label: "Karier, Bisnis & Relasi",
    fullLabel: "Karier, Bisnis & Relasi",
    department: "PENGKAR, BISMIT, EXTERN",
    programs: [
      {
        title: "Career Catalyst",
        description:
          "Bimbingan sertifikasi dan persiapan dunia kerja profesional.",
        icon: TrendingUp,
        linkKey: "career_catalyst_link",
      },
      {
        title: "EXPLORE",
        description:
          "Forum silaturahmi dan networking strategis dengan alumni.",
        icon: LinkIcon,
        linkKey: "explore_link",
      },
      {
        title: "Business Partnership",
        description:
          "Pengelolaan dana usaha dan kemitraan eksternal.",
        icon: Briefcase,
        linkKey: "business_partnership_link",
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
        linkKey: "jaring_aspirasi_link",
      },
      {
        title: "Kajian Strategis",
        description:
          "Analisis kritis isu sosial-ekonomi dan kebijakan kampus.",
        icon: FileText,
        linkKey: "kajian_strategis_link",
      },
      {
        title: "Bincang Sekma",
        description:
          "Forum diskusi langsung dengan Sekretariat PE FEB UI.",
        icon: Users,
        linkKey: "bincang_sekma_link",
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
        linkKey: "reach_project_link",
      },
      {
        title: "Talent Interest",
        description:
          "Wadah pengembangan hobi, olahraga, dan kreativitas mahasiswa.",
        icon: Palette,
        linkKey: "talent_interest_link",
      },
      {
        title: "Branding & Dokumentasi",
        description:
          "Pengelolaan visual dan identitas publik kabinet.",
        icon: Camera,
        linkKey: "branding_dokumentasi_link",
      },
    ],
  },
];

function findStringByKey(source: unknown, key: string): string | null {
  if (!source || typeof source !== "object") {
    return null;
  }

  if (Array.isArray(source)) {
    for (const item of source) {
      const value = findStringByKey(item, key);

      if (value) {
        return value;
      }
    }

    return null;
  }

  const record = source as Record<string, unknown>;
  const directValue = record[key];

  if (typeof directValue === "string" && directValue.trim()) {
    return directValue.trim();
  }

  for (const value of Object.values(record)) {
    const nestedValue = findStringByKey(value, key);

    if (nestedValue) {
      return nestedValue;
    }
  }

  return null;
}

function getProgramHref(
  source: AboutTentangKami | null,
  key: keyof AboutTentangKami,
) {
  if (!source) {
    return currentPageProgramHref;
  }

  const directValue = source[key];

  if (typeof directValue === "string" && directValue.trim()) {
    return directValue.trim();
  }

  return findStringByKey(source.program_detail_links, key) ?? currentPageProgramHref;
}

type FeaturedProgramsTabsProps = {
  programLinks?: AboutTentangKami | null;
};

export function FeaturedProgramsTabs({ programLinks = null }: FeaturedProgramsTabsProps) {
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
            href={getProgramHref(programLinks, program.linkKey as keyof AboutTentangKami)}
            {...program}
          />
        ))}
      </div>
    </div>
  );
}
