import type { LucideIcon } from "lucide-react";
import { ArrowRight, ChevronRight } from "lucide-react";

export type FeatureItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  details?: string[];
  action: string;
  href?: string;
  highlighted?: boolean;
  outlined?: boolean;
};

type FeaturesProps = {
  items: FeatureItem[];
};

export function Features({ items }: FeaturesProps) {
  return (
    <section id="akademik" className="bg-base-warm py-10 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title text-[26px] leading-none sm:text-[30px] lg:text-[34px]">
            Jelajahi Extensipedia
          </h2>
          <p className="section-subtitle mt-2">
            Akses semua layanan BEM PE FEB UI dalam satu platform terintegrasi
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;

            const iconWrapperClass =
              index < 2
                ? "bg-primary text-base-white"
                : item.title === "Karir & Networking"
                  ? "bg-[#EAF1FF] text-[#356AE6]"
                  : "bg-[#F8EDBF] text-[#D9A400]";

            return (
              <article
                key={item.title}
                className="flex min-h-[300px] flex-col rounded-[22px] border border-base-grey bg-base-white p-5 shadow-md shadow-primary/10 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/15 sm:min-h-[320px]"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconWrapperClass}`}
                >
                  <Icon className="h-6 w-6" />
                </span>

                <h3 className="mt-5 font-headline text-[22px] leading-tight text-primary">
                  {item.title}
                </h3>

                <p className="muted-copy mt-4 text-[15px] leading-8">
                  {item.description}
                </p>

                {item.details?.length ? (
                  <ul className="mt-4 space-y-1.5">
                    {item.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-[12px] leading-5 text-copy-soft"
                      >
                        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-copy-soft" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <a
                  href={item.href ?? "#"}
                  className="font-tagline mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-semibold text-primary"
                >
                  {item.action}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
