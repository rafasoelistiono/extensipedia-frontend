"use client";

import { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import type { AcademicCountdown } from "@/lib/public-api";

type CountdownCardProps = {
  item: AcademicCountdown | null;
  relatedItems: AcademicCountdown[];
};

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  target: Date | null;
};

function getCountdownParts(targetDateTime?: string): CountdownParts {
  if (!targetDateTime) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      target: null,
    };
  }

  const now = new Date();
  const target = new Date(targetDateTime);
  const diff = Math.max(0, target.getTime() - now.getTime());

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, target };
}

function getCountdownProgress(targetDateTime?: string) {
  if (!targetDateTime) {
    return 0;
  }

  const target = new Date(targetDateTime);
  const now = new Date();
  const daysLeft = Math.max(
    0,
    Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
  );

  if (daysLeft === 0) {
    return 100;
  }

  return Math.min(100, Math.max(12, 100 - Math.min(daysLeft, 30) * 3));
}

function formatTargetDate(value?: string) {
  if (!value) {
    return "Belum tersedia";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Belum tersedia";
  }

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function padValue(value: number) {
  return String(value).padStart(2, "0");
}

export function CountdownCard({ item, relatedItems }: CountdownCardProps) {
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    getCountdownParts(item?.target_datetime),
  );

  useEffect(() => {
    if (!item?.target_datetime) {
      return;
    }

    const interval = window.setInterval(() => {
      setCountdown(getCountdownParts(item.target_datetime));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [item?.target_datetime]);

  const progressWidth = getCountdownProgress(item?.target_datetime);

  return (
    <article className="rounded-[18px] bg-primary p-5 text-base-white shadow-[0_4px_17px_rgba(0,0,0,0.15)] sm:rounded-[20px] sm:p-7">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#385959] sm:h-14 sm:w-14 sm:rounded-[16px]">
          <CalendarClock className="h-7 w-7 text-cta sm:h-8 sm:w-8" />
        </div>
        <div>
          <div className="font-body text-[12px] uppercase tracking-[0.08em] text-[#cbd5e1]">
            Countdown
          </div>
          <div className="font-tagline text-[18px] text-base-white sm:text-[20px]">
            {item?.title ?? "Event Akademik"}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2 text-center sm:mt-7">
        {[
          [padValue(countdown.days), "Hari"],
          [padValue(countdown.hours), "Jam"],
          [padValue(countdown.minutes), "Menit"],
          [padValue(countdown.seconds), "Detik"],
        ].map(([value, label], index) => (
          <div key={label} className="relative">
            <div className="font-headline text-[34px] leading-none text-cta sm:text-[52px]">
              {value}
            </div>
            <div className="mt-1 font-tagline text-[12px] text-[#cbd5e1] sm:mt-2 sm:text-[15px]">
              {label}
            </div>
            {index < 3 ? (
              <span className="absolute -right-1 top-1 font-headline text-[34px] leading-none text-[#cbd5e1] sm:-right-2 sm:top-2 sm:text-[52px]">
                :
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-5 h-[10px] rounded-full bg-[rgba(241,245,249,0.2)] sm:mt-6 sm:h-[13px]">
        <div
          className="h-[10px] rounded-full bg-cta transition-all sm:h-[13px]"
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      <div className="mt-5 border-t border-base-white/20 pt-4 font-tagline text-[14px] text-[#cbd5e1]/80 sm:mt-6 sm:pt-5 sm:text-[15px]">
        Target :{" "}
        {item
          ? `${item.title} - ${formatTargetDate(item.target_datetime)}`
          : "Belum tersedia"}
      </div>

      {relatedItems.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {relatedItems.slice(0, 3).map((relatedItem) => (
            <span
              key={relatedItem.id}
              className="rounded-full bg-base-white/10 px-3 py-1 text-[12px] text-[#e2e8f0]"
            >
              {relatedItem.title}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
