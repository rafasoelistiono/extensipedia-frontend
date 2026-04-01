"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Ticket } from "lucide-react";
import { Button } from "@/components/ui/Button";

type AspirasiCardProps = {
  title: string;
  description?: string;
  shortDescription?: string;
  user?: string;
  senderName?: string | null;
  ticketId?: string;
  status?: string;
  visibility?: string;
  upvoteCount?: number;
  voteCount?: number;
  createdAt?: string;
  featured?: boolean;
  evidenceImage?: string;
};

function formatStatus(status?: string) {
  if (!status) {
    return null;
  }

  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatCreatedAt(createdAt?: string) {
  if (!createdAt) {
    return null;
  }

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function AspirasiCard({
  title,
  description,
  shortDescription,
  user,
  senderName,
  ticketId,
  status,
  visibility,
  upvoteCount = 0,
  voteCount = 0,
  createdAt,
  featured = false,
  evidenceImage,
}: AspirasiCardProps) {
  const [showEvidence, setShowEvidence] = useState(false);
  const resolvedDescription = shortDescription ?? description ?? "";
  const resolvedUser =
    user ??
    (visibility === "anonymous"
      ? "Anonim"
      : senderName
        ? `Dikirim oleh ${senderName}`
        : "Mahasiswa Ekstensi");
  const formattedStatus = formatStatus(status);
  const formattedDate = formatCreatedAt(createdAt);

  return (
    <article className="flex min-h-[240px] flex-col rounded-[16px] border border-base-grey bg-base-white p-5 shadow-lg shadow-primary/5 sm:min-h-[260px] sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        {formattedStatus ? (
          <span className="inline-flex items-center rounded-full bg-[#e8f4fd] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
            {formattedStatus}
          </span>
        ) : null}
        {visibility ? (
          <span className="inline-flex items-center rounded-full bg-[#f3f4f6] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-copy-soft">
            {visibility}
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 font-tagline text-[16px] font-bold leading-7 text-primary">
        {title}
      </h3>

      <p className="muted-copy mt-4 text-sm leading-6">{resolvedDescription}</p>

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
        {ticketId || formattedDate ? (
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-copy-soft">
            {ticketId ? (
              <span className="inline-flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                {ticketId}
              </span>
            ) : null}
            {formattedDate ? <span>{formattedDate}</span> : null}
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center gap-4 text-[12px] text-copy">
          <span className="inline-flex items-center gap-2">
            <Heart className="h-4 w-4" />
            {upvoteCount}
          </span>

          <span className="inline-flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            {voteCount}
          </span>

          <span className="text-[12px] text-copy">{resolvedUser}</span>
        </div>

        {featured && evidenceImage ? (
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
