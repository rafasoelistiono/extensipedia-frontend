"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, Megaphone, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";

type SubmitResponse = {
  message?: string;
  data?: {
    message?: string;
    data?: {
      ticket_id?: string;
      title?: string;
      status?: string;
      submitted_at?: string;
    };
  };
};

const submittingSteps = [
  "Menyimpan form aspirasi ke sistem.",
  "Meminta backend membuat ticket ID.",
  "Menunggu respons akhir atau pesan error dari server.",
] as const;

export function AspirationSubmitForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    if (status !== "submitting") {
      setLoadingStep(0);
      return;
    }

    const interval = window.setInterval(() => {
      setLoadingStep((current) => (current + 1) % submittingSteps.length);
    }, 1400);

    return () => window.clearInterval(interval);
  }, [status]);

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    setMessage("Sedang membuat ticket, mengirim data ke backend, dan menunggu konfirmasi email.");
    setTicketId(null);

    try {
      const response = await fetch("/api/aspirations/submit", {
        method: "POST",
        body: formData,
      });

      const result = (await response.json()) as SubmitResponse;

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengirim aspirasi.");
      }

      setStatus("success");
      setTicketId(result.data?.data?.ticket_id ?? null);
      setMessage(
        result.message ||
          "Aspirasi berhasil dikirim ke backend. Notifikasi lanjutan akan dikirim melalui email.",
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Terjadi kendala saat mengirim aspirasi.",
      );
    }
  }

  return (
    <article className="overflow-hidden rounded-[20px] border border-base-grey bg-base-white shadow-[0_4px_17px_rgba(0,0,0,0.16)]">
      <div className="flex items-center gap-3 bg-primary px-5 py-5 text-base-white sm:px-6">
        <Megaphone className="h-5 w-5 text-cta" />
        <h3 className="font-headline text-[22px] leading-none text-base-white">
          Sampaikan Aspirasimu
        </h3>
      </div>

      <form action={handleSubmit} className="relative p-5 sm:p-6">
        <fieldset disabled={status === "submitting"} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="font-tagline text-[14px] font-semibold text-primary">
                NAMA LENGKAP
              </span>
              <input
                type="text"
                name="full_name"
                placeholder="Nama Kamu"
                className="input-base mt-2 h-12 w-full rounded-[10px] px-4 text-[14px] outline-none"
                required
              />
            </label>
            <label className="block">
              <span className="font-tagline text-[14px] font-semibold text-primary">NPM</span>
              <input
                type="text"
                name="npm"
                placeholder="NPM Kamu"
                className="input-base mt-2 h-12 w-full rounded-[10px] px-4 text-[14px] outline-none"
                required
              />
            </label>
          </div>

          <label className="block">
            <span className="font-tagline text-[14px] font-semibold text-primary">EMAIL</span>
            <input
              type="email"
              name="email"
              placeholder="email@ui.ac.id"
              className="input-base mt-2 h-12 w-full rounded-[10px] px-4 text-[14px] outline-none"
              required
            />
          </label>

          <label className="block">
            <span className="font-tagline text-[14px] font-semibold text-primary">
              JUDUL ASPIRASI
            </span>
            <input
              type="text"
              name="title"
              placeholder="Ringkasan singkat masalah atau usulan kamu"
              className="input-base mt-2 h-12 w-full rounded-[10px] px-4 text-[14px] outline-none"
              required
            />
          </label>

          <label className="block">
            <span className="font-tagline text-[14px] font-semibold text-primary">
              KETERANGAN SINGKAT
            </span>
            <textarea
              name="short_description"
              placeholder="Ceritakan inti aspirasi kamu secara jelas agar mudah ditindaklanjuti backend."
              rows={5}
              className="input-base mt-2 w-full rounded-[10px] px-4 py-3 text-[14px] leading-6 outline-none"
              required
            />
          </label>

          <div>
            <span className="font-tagline text-[14px] font-semibold text-primary">
              LAMPIRAN BUKTI (OPSIONAL)
            </span>
            <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-[16px] border border-dashed border-base-grey bg-surface-subtle px-6 py-10 text-center">
              <Upload className="h-9 w-9 text-copy-soft" />
              <p className="mt-4 text-[14px] leading-6 text-copy-soft">
                Drag & drop atau{" "}
                <span className="font-semibold text-primary">klik untuk upload</span>
                <br />
                JPG, PNG, PDF, max 5MB
              </p>
              <span className="mt-4 rounded-[10px] border border-panel-border bg-base-white px-4 py-2 text-[13px] font-semibold text-primary">
                Select File
              </span>
              {selectedFileName ? (
                <span className="mt-3 text-[13px] text-copy-soft">
                  {selectedFileName}
                </span>
              ) : null}
              <input
                type="file"
                name="evidence_attachment"
                className="hidden"
                onChange={(event) =>
                  setSelectedFileName(event.target.files?.[0]?.name ?? null)
                }
              />
            </label>
          </div>

          {status === "submitting" ? (
            <div
              aria-live="polite"
              className="rounded-[14px] border border-[#bfd7ea] bg-[#eef7fd] px-4 py-4 text-[14px] text-primary"
            >
              <div className="flex items-center gap-3">
                <LoaderCircle className="h-5 w-5 animate-spin text-primary" />
                <p className="font-tagline text-[14px] font-semibold">
                  Aspirasi sedang diproses
                </p>
              </div>
              <p className="mt-2 leading-6 text-copy-soft">{submittingSteps[loadingStep]}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#d7e8f5]">
                <div
                  className="h-full w-1/2 animate-pulse rounded-full bg-primary"
                  style={{ transform: `translateX(${loadingStep * 50}%)` }}
                />
              </div>
            </div>
          ) : null}

          {message && status !== "submitting" ? (
            <div
              aria-live="polite"
              className={[
                "rounded-[10px] px-4 py-3 text-[14px]",
                status === "success"
                  ? "bg-[#ecfdf3] text-[#166534]"
                  : "bg-[#fff1f2] text-[#be123c]",
              ].join(" ")}
            >
              <p>{message}</p>
              {ticketId ? (
                <p className="mt-2 font-semibold">Ticket ID: {ticketId}</p>
              ) : null}
            </div>
          ) : null}

          <Button
            type="submit"
            variant="secondary"
            className="h-11 w-full justify-center rounded-[10px] text-[14px] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Mengirim Aspirasi..." : "Kirim Aspirasi"}
          </Button>
        </fieldset>

        {status === "submitting" ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-b-[20px] bg-primary/12 px-6 backdrop-blur-[3px]">
            <div className="w-full max-w-[420px] rounded-[18px] border border-[#bfd7ea] bg-base-white px-6 py-6 text-center shadow-[0_18px_48px_rgba(3,57,93,0.18)]">
              <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 font-tagline text-[17px] font-semibold text-primary">
                Sedang mengirim aspirasi
              </p>
              <p className="mt-2 text-[14px] leading-6 text-copy-soft">
                Mohon tunggu sampai ticket ID berhasil dibuat atau sistem mengembalikan pesan error.
              </p>
              <div className="mt-5 flex items-center justify-center gap-2">
                {submittingSteps.map((step, index) => (
                  <span
                    key={step}
                    className={[
                      "h-2.5 rounded-full transition-all duration-300",
                      index === loadingStep ? "w-8 bg-primary" : "w-2.5 bg-[#c8dcec]",
                    ].join(" ")}
                  />
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-6 text-copy-soft">
                {submittingSteps[loadingStep]}
              </p>
            </div>
          </div>
        ) : null}
      </form>
    </article>
  );
}
