import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ProgramCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

export function ProgramCard({
  icon: Icon,
  title,
  description,
  href,
  linkLabel = "Lihat detail",
}: ProgramCardProps) {
  return (
    <article className="flex min-h-[230px] flex-col gap-[14px] rounded-[17px] border-2 border-primary bg-base-white px-7 py-[30px]">
      <div className="flex h-16 w-16 items-center justify-center rounded-[17px] bg-primary">
        <Icon className="h-10 w-10 text-base-white" strokeWidth={1.75} />
      </div>

      <div className="flex flex-col gap-[7px]">
        <h3 className="font-tagline text-[24px] font-bold leading-none text-primary">
          {title}
        </h3>
        <p className="font-tagline text-[18px] font-normal leading-[1.05] text-copy-muted">
          {description}
        </p>
      </div>

      {href ? (
        <a
          href={href}
          className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-cta px-4 py-2 font-tagline text-[15px] font-semibold leading-none text-primary transition hover:bg-cta/85"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </a>
      ) : null}
    </article>
  );
}
