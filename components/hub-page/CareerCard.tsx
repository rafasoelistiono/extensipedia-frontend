import { ArrowUpRight, BriefcaseBusiness, Building2, CalendarDays, FileText } from "lucide-react";

type CareerCardProps = {
  type: "Internship" | "Career Event" | "Career Center";
  title: string;
  organizer: string;
  description: string;
  deadline: string;
  ctaLabel: string;
  href?: string | null;
};

const iconMap = {
  Internship: BriefcaseBusiness,
  "Career Event": Building2,
  "Career Center": FileText,
} as const;

export function CareerCard({
  type,
  title,
  organizer,
  description,
  deadline,
  ctaLabel,
  href,
}: CareerCardProps) {
  const Icon = iconMap[type];
  const isAvailable = Boolean(href);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[18px] bg-base-white shadow-[0_4px_17px_rgba(0,0,0,0.1)] sm:rounded-[20px]">
      <div className="flex h-[170px] items-end bg-[#0a5a8a] px-4 pb-4 sm:h-[220px]">
        <span className="inline-flex items-center gap-2 rounded-full bg-base-white/90 px-3 py-1 text-[12px] font-bold text-primary">
          <Icon className="h-3.5 w-3.5" />
          {type}
        </span>
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-4 sm:p-5">
        <div>
          <h3 className="font-headline text-[20px] leading-tight text-primary">
            {title}
          </h3>
          <p className="mt-1 font-tagline text-[12px] font-semibold text-[#64748b]">
            {organizer}
          </p>
        </div>

        <p className="font-body text-[14px] leading-6 text-[#64748b]">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between rounded-[10px] bg-surface-muted px-4 py-3">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-copy-soft" />
            <div>
              <div className="font-tagline text-[10px] text-copy-soft">DEADLINE</div>
              <div className="font-tagline text-[16px] font-bold text-primary">{deadline}</div>
            </div>
          </div>
          <span className="rounded-[8px] bg-[#e8f4fd] px-3 py-1 text-[12px] font-bold text-primary">
            Terbaru
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={href ?? "#"}
            target={isAvailable ? "_blank" : undefined}
            rel={isAvailable ? "noreferrer" : undefined}
            aria-disabled={!isAvailable}
            className={[
              "flex h-10 flex-1 items-center justify-center gap-2 rounded-[10px] px-3 font-tagline text-[15px] font-bold sm:text-[16px]",
              isAvailable
                ? "bg-primary !text-base-white"
                : "cursor-not-allowed bg-[#cbd5e1] text-base-white/90",
            ].join(" ")}
          >
            {ctaLabel}
          </a>
          <a
            href={href ?? "#"}
            target={isAvailable ? "_blank" : undefined}
            rel={isAvailable ? "noreferrer" : undefined}
            aria-disabled={!isAvailable}
            className={[
              "flex h-10 w-10 items-center justify-center rounded-[10px]",
              isAvailable
                ? "bg-[#f3f4f6] text-primary"
                : "cursor-not-allowed bg-[#e5e7eb] text-[#94a3b8]",
            ].join(" ")}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
