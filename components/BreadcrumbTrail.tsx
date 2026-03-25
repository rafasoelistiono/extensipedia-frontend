import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem =
  | string
  | {
      label: string;
      href?: string;
    };

type BreadcrumbTrailProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function BreadcrumbTrail({ items, className = "" }: BreadcrumbTrailProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={[
        "flex flex-wrap items-center gap-1.5 font-tagline text-[13px] text-cta sm:gap-2 sm:text-[16px]",
        className,
      ].join(" ")}
    >
      {items.map((item, index) => {
        const normalized = typeof item === "string" ? { label: item } : item;
        const isLast = index === items.length - 1;

        return (
          <div key={`${normalized.label}-${index}`} className="flex items-center gap-1.5 sm:gap-2">
            {normalized.href && !isLast ? (
              <Link href={normalized.href} className="text-[#e1ad00] transition hover:text-cta">
                {normalized.label}
              </Link>
            ) : (
              <span className={isLast ? "font-semibold text-cta" : "text-[#e1ad00]"}>
                {normalized.label}
              </span>
            )}
            {!isLast ? <ChevronRight className="h-3.5 w-3.5 text-cta sm:h-4 sm:w-4" /> : null}
          </div>
        );
      })}
    </nav>
  );
}
