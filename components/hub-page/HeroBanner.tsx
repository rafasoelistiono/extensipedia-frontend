import Link from "next/link";
import { BriefcaseBusiness, Trophy } from "lucide-react";
import { BreadcrumbTrail } from "@/components/BreadcrumbTrail";

type HeroTab = {
  label: string;
  active?: boolean;
  icon: "trophy" | "briefcase";
  href?: string;
};

type HeroBannerProps = {
  title: string;
  description: string;
  backgroundImage: string;
  breadcrumbs?: Array<
    | string
    | {
        label: string;
        href?: string;
      }
  >;
  tabs?: HeroTab[];
};

const iconMap = {
  trophy: Trophy,
  briefcase: BriefcaseBusiness,
} as const;

export function HeroBanner({
  title,
  description,
  backgroundImage,
  breadcrumbs,
  tabs,
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-primary">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="page-hero-tint absolute inset-0" />
      <div className="absolute inset-0 bg-primary/56" />

      <div className="relative mx-auto flex min-h-[320px] w-full max-w-[1440px] items-end px-4 pb-14 pt-16 sm:min-h-[360px] sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 lg:pb-20">
        <div className="mx-auto w-full max-w-[1280px]">
          {breadcrumbs?.length ? (
            <BreadcrumbTrail items={breadcrumbs} />
          ) : null}

          <h1 className="mt-4 font-headline text-[34px] leading-none text-base-white sm:mt-5 sm:text-[56px] lg:text-[64px]">
            {title}
          </h1>

          <p className="mt-4 max-w-[992px] font-body text-[15px] leading-[1.65] text-base-white/80 sm:text-[20px] sm:leading-[1.5]">
            {description}
          </p>

          {tabs?.length ? (
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-8 sm:gap-4">
              {tabs.map((tab) => {
                const Icon = iconMap[tab.icon];

                const baseClass = [
                  "inline-flex h-11 items-center justify-center gap-3 rounded-[18px] px-4 font-tagline text-[14px] font-semibold [&_svg]:shrink-0 sm:h-14 sm:rounded-[20px] sm:px-6 sm:text-[18px]",
                  tab.active
                    ? "bg-cta text-primary shadow-[0_8px_22px_rgba(252,194,2,0.28)]"
                    : "bg-[#275574] !text-base-white [&_svg]:!text-base-white",
                ].join(" ");

                return tab.href ? (
                  <Link
                    key={tab.label}
                    href={tab.href}
                    className={baseClass}
                  >
                    <Icon className="h-6 w-6" />
                    {tab.label}
                  </Link>
                ) : (
                  <button key={tab.label} type="button" className={baseClass}>
                    <Icon className="h-6 w-6" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
