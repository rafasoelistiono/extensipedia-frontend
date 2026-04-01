"use client";

import { useState } from "react";
import { ArrowUpRight, Search, Ticket } from "lucide-react";
import { Button } from "@/components/ui/Button";

type TicketTracking = {
  ticket_id: string | null;
  title: string | null;
  status: string | null;
  submitted_at: string | null;
  updated_at: string | null;
  visibility: string | null;
  short_description: string | null;
};

type TrackingResponse = {
  message?: string;
  data?: TicketTracking;
};

function formatStatus(status: string | null) {
  if (!status) {
    return null;
  }

  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TicketTracker() {
  const [ticketId, setTicketId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState(
    "Masukkan ticket ID untuk melihat progres aspirasi.",
  );
  const [result, setResult] = useState<TicketTracking | null>(null);

  async function handleTrack() {
    setStatus("loading");
    setMessage("");

    try {
      const params = new URLSearchParams();

      if (ticketId.trim()) {
        params.set("ticket_id", ticketId.trim());
      }

      const response = await fetch(`/api/aspirations/track?${params.toString()}`, {
        cache: "no-store",
      });
      const payload = (await response.json()) as TrackingResponse;

      if (!response.ok) {
        throw new Error(payload.message || "Gagal melacak tiket.");
      }

      setStatus("success");
      setMessage(payload.message || "Tracking tiket berhasil dimuat.");
      setResult(payload.data ?? null);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Terjadi kendala saat melacak tiket.",
      );
      setResult(null);
    }
  }

  const isFound = Boolean(result?.ticket_id);

  return (
    <article className="overflow-hidden rounded-[20px] border border-base-grey bg-base-white shadow-[0_4px_17px_rgba(0,0,0,0.16)]">
      <div className="flex items-center gap-3 bg-primary px-5 py-5 text-base-white sm:px-6">
        <Ticket className="h-5 w-5 text-cta" />
        <h3 className="font-headline text-[22px] leading-none text-base-white">
          Jaring Aspirasi Digital
        </h3>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative block flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-copy-soft" />
            <input
              type="text"
              value={ticketId}
              onChange={(event) => setTicketId(event.target.value)}
              placeholder="ID Tiket (Contoh: ASP-1A2B3C4D5E)"
              className="input-base h-12 w-full rounded-[10px] pl-11 pr-4 text-[14px] outline-none"
            />
          </label>

          <Button
            variant="secondary"
            className="h-12 rounded-[10px] px-5 text-[14px] sm:min-w-[88px]"
            onClick={handleTrack}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Melacak..." : "Lacak"}
          </Button>
        </div>

        <p
          className={[
            "rounded-[12px] px-4 py-3 text-[14px]",
            status === "error"
              ? "bg-[#fff1f2] text-[#be123c]"
              : "bg-[#eff6ff] text-primary",
          ].join(" ")}
        >
          {message}
        </p>

        <div className="rounded-[20px] border border-[#d0e1ec] bg-[#e8f4fd] p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-copy-soft">
                ID Tiket
              </div>
              <div className="mt-1 font-headline text-[24px] leading-none text-primary">
                {result?.ticket_id ?? "-"}
              </div>
              <p className="mt-2 text-[12px] leading-5 text-copy-soft">
                Visibility: {result?.visibility ?? "-"} · Diajukan:{" "}
                {formatDate(result?.submitted_at ?? null)}
              </p>
              <p className="mt-2 font-tagline text-[15px] font-semibold text-primary">
                {result?.title ?? "Belum ada tiket yang ditampilkan"}
              </p>
            </div>

            <span className="inline-flex h-7 items-center justify-center rounded-full bg-cta px-3 font-tagline text-[12px] font-semibold text-primary">
              {formatStatus(result?.status ?? null) ?? "Belum ada status"}
            </span>
          </div>

          <div className="mt-4 overflow-hidden rounded-[10px] bg-[#ffecaf]">
            <div className="flex items-center justify-between px-4 py-2 font-tagline text-[14px] font-semibold text-primary">
              Detail Tiket
            </div>
            <div className="p-2 pt-0">
              <div className="rounded-[12px] bg-base-white px-4 py-3 text-[14px] leading-7 text-black">
                {result?.short_description ??
                  "Cari ticket ID yang benar untuk melihat detail progres aspirasi."}
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[10px] bg-base-white px-4 py-3 text-[13px] text-copy-soft">
              <div className="font-semibold text-primary">Diperbarui</div>
              <div className="mt-1">{formatDate(result?.updated_at ?? null)}</div>
            </div>
            <a
              href={isFound ? "/advokasi" : "#"}
              className={[
                "inline-flex h-10 items-center justify-center gap-2 rounded-[8px] px-4 font-tagline text-[14px] font-semibold [&_svg]:!text-base-white",
                isFound
                  ? "bg-primary !text-base-white transition hover:bg-[#0a4c79]"
                  : "cursor-not-allowed bg-[#cbd5e1] !text-base-white",
              ].join(" ")}
            >
              Lihat Form Aspirasi
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
