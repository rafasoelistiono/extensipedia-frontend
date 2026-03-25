"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

type AspirasiCardProps = {
  title: string;
  description: string;
  user: string;
  featured?: boolean;
  evidenceImage?: string;
};

export function AspirasiCard({
  title,
  description,
  user,
  featured,
  evidenceImage,
}: AspirasiCardProps) {
  const [showEvidence, setShowEvidence] = useState(false);

  return (
    <article className="flex min-h-[240px] flex-col rounded-[16px] border border-base-grey bg-base-white p-5 shadow-lg shadow-primary/5 sm:min-h-[260px] sm:p-6">
      <h3 className="font-tagline max-w-[260px] text-[16px] font-bold leading-7 text-primary">
        {title}
      </h3>

      <p className="muted-copy mt-4 text-sm leading-6">{description}</p>

      {/* IMAGE (hidden by default) */}
      {featured && evidenceImage && showEvidence ? (
        <div className="mt-4 overflow-hidden rounded-xl border border-base-grey">
          <div className="relative h-[140px] w-full">
            <Image
              src={evidenceImage}
              alt="Bukti aspirasi"
              fill
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <div className="mt-auto pt-5">
        <div className="flex flex-wrap items-center gap-4 text-[12px] text-copy">
          <span className="inline-flex items-center gap-2">
            <Heart className="h-4 w-4" />
          </span>

          <span className="inline-flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
          </span>

          <span className="text-[12px] text-copy">{user}</span>
        </div>

        {/* BUTTON */}
        {featured ? (
          <Button
            variant="secondary"
            className="mt-4 w-full justify-center rounded-md px-4 py-2 text-[11px]"
            onClick={() => setShowEvidence((prev) => !prev)}
          >
            {showEvidence ? "Tutup Bukti" : "Lihat Bukti"}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
