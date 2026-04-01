import { ExternalLink, FolderOpen } from "lucide-react";

type RepositoryCardProps = {
  title: string;
  items: Array<{
    id: string;
    title: string;
    href: string;
  }>;
  tone: "yellow" | "blue";
};

export function RepositoryCard({ title, items, tone }: RepositoryCardProps) {
  const toneClasses =
    tone === "yellow"
      ? {
          bar: "bg-accent-soft",
          iconWrap: "bg-accent-soft",
          item: "bg-accent-soft text-primary",
        }
      : {
          bar: "bg-[#eff6ff]",
          iconWrap: "bg-[#eff6ff]",
          item: "bg-[#eff6ff] text-primary",
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
          {items.length > 0 ? (
            items.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={`flex min-h-[48px] w-full items-center justify-between gap-3 rounded-[12px] px-3 py-3 font-tagline text-[16px] font-semibold sm:min-h-[52px] sm:text-[18px] ${toneClasses.item}`}
              >
                <span className="line-clamp-2">{item.title}</span>
                <ExternalLink className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />
              </a>
            ))
          ) : (
            <div className="rounded-[12px] border border-dashed border-panel-border px-4 py-5 text-center font-tagline text-[15px] text-copy-soft">
              Repository belum tersedia.
            </div>
          )}
        </div>

        <p className="font-tagline text-[15px] text-copy-muted sm:text-[16px]">
          {items.length > 0
            ? `${items.length} folder tersedia`
            : "Belum ada folder aktif"}
        </p>
      </div>
    </article>
  );
}
