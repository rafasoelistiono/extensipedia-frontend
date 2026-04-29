"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OrganizationCard } from "@/components/about-page/OrganizationCard";
import { SectionHeader } from "@/components/about-page/SectionHeader";

type OrganizationMember = {
  name: string;
  role: string;
  unit: string;
  image: string;
  imageClassName?: string;
};

type OrganizationCarouselProps = {
  members: OrganizationMember[];
};

export function OrganizationCarousel({
  members,
}: OrganizationCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 320;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <SectionHeader
          eyebrow="Tim Kabinet"
          title="Struktur Organisasi"
          description="Pimpinan setiap unit kerja Gema Cita Bersama 2026"
        />

        <div className="flex items-center gap-[13px] self-start pt-3">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="flex h-[50px] w-[50px] items-center justify-center rounded-[10px] bg-primary text-base-white shadow-[0_4px_17px_rgba(0,0,0,0.15)] transition hover:scale-[1.05]"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="flex h-[50px] w-[50px] items-center justify-center rounded-[10px] bg-cta text-primary shadow-[0_4px_17px_rgba(0,0,0,0.15)] transition hover:scale-[1.05]"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-7 w-7" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="mt-8 flex gap-5 overflow-x-auto pb-4 scroll-smooth sm:gap-7"
      >
        {members.map((member) => (
          <OrganizationCard key={member.name} {...member} />
        ))}
      </div>
    </>
  );
}
