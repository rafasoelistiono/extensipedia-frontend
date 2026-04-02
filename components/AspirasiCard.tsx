"use client";

import { useState } from "react";
import Image from "next/image";
import { LoaderCircle, ThumbsDown, ThumbsUp, Ticket } from "lucide-react";
import { Button } from "@/components/ui/Button";

type AspirasiCardProps = {
  id?: string;
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

type ActionResponse = {
  success: boolean;
  message: string;
  data: {
    id: string;
    ticket_id: string;
    upvote_count: number;
    vote_count: number;
  };
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://203.194.113.185").replace(
  /\/$/,
  "",
);

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
  id,
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
  const [upvoteValue, setUpvoteValue] = useState(upvoteCount);
  const [voteValue, setVoteValue] = useState(voteCount);
  const [loadingAction, setLoadingAction] = useState<"upvote" | "vote" | null>(null);
  const [actionError, setActionError] = useState("");
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
  const canInteract = Boolean(id);

  async function handleAction(action: "upvote" | "vote") {
    if (!id) {
      return;
    }

    setLoadingAction(action);
    setActionError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/public/aspirations/${id}/${action}/`,
        {
          method: "POST",
        },
      );
      const payload = (await response.json()) as ActionResponse;

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || `Gagal melakukan ${action}.`);
      }

      setUpvoteValue(payload.data.upvote_count);
      setVoteValue(payload.data.vote_count);
    } catch (error) {
      setActionError(
        error instanceof Error
          ? error.message
          : "Terjadi kendala saat memproses aksi aspirasi.",
      );
    } finally {
      setLoadingAction(null);
    }
  }

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

        <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-copy">
          <button
            type="button"
            onClick={() => handleAction("upvote")}
            disabled={!canInteract || loadingAction !== null}
            className="inline-flex items-center gap-2 rounded-full border border-base-grey px-3 py-1.5 transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingAction === "upvote" ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <ThumbsUp className="h-4 w-4" />
            )}
            {upvoteValue}
          </button>

          <button
            type="button"
            onClick={() => handleAction("vote")}
            disabled={!canInteract || loadingAction !== null}
            className="inline-flex items-center gap-2 rounded-full border border-base-grey px-3 py-1.5 transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingAction === "vote" ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <ThumbsDown className="h-4 w-4" />
            )}
            {voteValue}
          </button>

          <span className="text-[12px] text-copy">{resolvedUser}</span>
        </div>

        {actionError ? (
          <p className="mt-3 rounded-[10px] bg-[#fff1f2] px-3 py-2 text-[12px] text-[#be123c]">
            {actionError}
          </p>
        ) : null}

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
