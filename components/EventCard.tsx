import { CalendarDays, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

type EventCardProps = {
  title: string;
  date: string;
  tag: string;
  subtitle: string;
  tone?: "primary" | "sky" | "teal";
};

const toneClassMap = {
  primary: "bg-primary",
  sky: "bg-secondary-sky",
  teal: "bg-secondary-strong",
} as const;

export function EventCard({
  title,
  date,
  tag,
  subtitle,
  tone = "primary",
}: EventCardProps) {
  return (
    <article className="overflow-hidden rounded-[16px] border border-base-grey bg-base-white shadow-md shadow-primary/10">
      <div className={`h-[160px] w-full sm:h-[190px] ${toneClassMap[tone]}`} />

      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-danger-soft px-2.5 py-1 text-[10px] font-semibold text-danger-text">
            Open Slot
          </span>
          <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[10px] font-semibold text-accent-text">
            {tag}
          </span>
        </div>

        <h3 className="font-tagline mt-4 text-[16px] font-bold leading-6 text-primary">
          {title}
        </h3>

        <p className="muted-copy mt-2 text-[12px] leading-5">{subtitle}</p>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div className="space-y-1.5">
            <div className="muted-copy flex items-center gap-2 text-[11px]">
              <MapPin className="h-3.5 w-3.5" />
              FEB UI
            </div>

            <div className="flex items-center gap-2 text-[12px] font-medium text-date-text">
              <CalendarDays className="h-3.5 w-3.5" />
              {date}
            </div>
          </div>

          <Button
            variant="secondary"
            className="px-4 py-2 text-[11px] rounded-lg"
          >
            Lihat Detail
          </Button>
        </div>
      </div>
    </article>
  );
}