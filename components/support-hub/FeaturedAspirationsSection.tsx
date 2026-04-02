"use client";

import { useMemo, useState } from "react";
import { BadgeAlert } from "lucide-react";
import { AspirasiCard } from "@/components/AspirasiCard";
import type { FeaturedAspiration } from "@/lib/public-api";

type FeaturedAspirationsSectionProps = {
  aspirations: FeaturedAspiration[];
};

export function FeaturedAspirationsSection({
  aspirations,
}: FeaturedAspirationsSectionProps) {
  const [filter, setFilter] = useState<"all" | "public" | "anonymous">("all");

  const filteredAspirations = useMemo(() => {
    if (filter === "all") {
      return aspirations;
    }

    return aspirations.filter((item) => item.visibility === filter);
  }, [aspirations, filter]);

  return (
    <section className="bg-base-white px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8">
      <div className="mx-auto max-w-[1287px]">
        <div className="text-center">
          <div className="section-eyebrow">Aspirasi Mahasiswa</div>
          <h2 className="section-title mt-2 text-[30px] leading-none sm:text-[42px]">
            Jaring Aspirasi
          </h2>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[12px] sm:mt-8 sm:gap-3">
          <span className="inline-flex items-center gap-2 text-copy-soft">
            <BadgeAlert className="h-4 w-4" />
            Publikasi:
          </span>
          {[
            ["all", "Semua"],
            ["public", "Publik"],
            ["anonymous", "Anonim"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value as "all" | "public" | "anonymous")}
              className={[
                "rounded-full px-4 py-1.5 font-tagline text-[13px] transition sm:px-5 sm:text-[14px]",
                filter === value ? "pill-tab-active" : "pill-tab",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>

        {filteredAspirations.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 sm:mt-8">
            {filteredAspirations.map((item) => (
              <AspirasiCard
                key={item.id}
                title={item.title}
                shortDescription={item.short_description}
                senderName={item.sender_name}
                status={item.status}
                visibility={item.visibility}
                upvoteCount={item.upvote_count}
                voteCount={item.vote_count}
                createdAt={item.created_at}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[20px] border border-dashed border-panel-border bg-surface-subtle px-6 py-12 text-center">
            <p className="font-headline text-[28px] text-primary">
              Aspirasi featured masih kosong.
            </p>
            <p className="mx-auto mt-3 max-w-[560px] text-[15px] leading-7 text-copy-soft">
              Belum ada aspirasi yang ditandai featured oleh backend untuk filter
              yang dipilih.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
