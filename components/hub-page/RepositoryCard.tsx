import { ExternalLink, FolderOpen } from "lucide-react";

type RepositoryCardProps = {
  title: string;
  years: string[];
  tone: "yellow" | "blue";
};

export function RepositoryCard({ title, years, tone }: RepositoryCardProps) {
  const toneClasses =
    tone === "yellow"
      ? {
          bar: "bg-accent-soft",
          iconWrap: "bg-accent-soft",
          year: "bg-accent-soft text-primary",
        }
      : {
          bar: "bg-[#eff6ff]",
          iconWrap: "bg-[#eff6ff]",
          year: "bg-[#eff6ff] text-primary",
        };

  return (
    <article className="overflow-hidden rounded-[22px] bg-base-white shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:rounded-[26px]">
      <div className={`h-7 sm:h-8 ${toneClasses.bar}`} />
      <div className="space-y-4 p-5 sm:space-y-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-[58px] w-[58px] items-center justify-center rounded-[15px] sm:h-[66px] sm:w-[66px] sm:rounded-[17px] ${toneClasses.iconWrap}`}
          >
            <FolderOpen className="h-8 w-8 text-cta sm:h-9 sm:w-9" />
          </div>
          <h3 className="font-tagline text-[22px] font-medium text-black sm:text-[24px]">
            {title}
          </h3>
        </div>

        <div className="space-y-3">
          {years.map((year) => (
            <button
              key={year}
              type="button"
              className={`flex h-[48px] w-full items-center justify-between rounded-[12px] px-3 py-2 font-tagline text-[18px] font-semibold sm:h-[52px] sm:text-[20px] ${toneClasses.year}`}
            >
              {year}
              <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          ))}
        </div>

        <p className="font-tagline text-[15px] text-copy-muted sm:text-[16px]">
          Master Drive · Buka Drive
        </p>
      </div>
    </article>
  );
}
