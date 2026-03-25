import {
  CalendarDays,
  CalendarPlus2,
  ExternalLink,
  Globe,
  Laptop,
  Trophy,
  Users,
} from "lucide-react";

type CompetitionCardProps = {
  category: "Lomba" | "Workshop";
  scope: "Nasional" | "Internasional";
  title: string;
  organizer: string;
  description: string;
  deadline: string;
  urgency: string;
  tone: "primary" | "sky" | "green";
  recommended?: boolean;
  findTeam?: boolean;
};

const toneClassMap = {
  primary: "bg-primary",
  sky: "bg-[#0a5a8a]",
  green: "bg-[#1a6b3c]",
} as const;

export function CompetitionCard({
  category,
  scope,
  title,
  organizer,
  description,
  deadline,
  urgency,
  tone,
  recommended = false,
  findTeam = false,
}: CompetitionCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[18px] bg-base-white shadow-[0_4px_17px_rgba(0,0,0,0.1)] sm:rounded-[20px]">
      <div className={`flex h-[170px] items-end px-4 pb-4 sm:h-[220px] ${toneClassMap[tone]}`}>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#ea4445] px-3 py-1 text-[12px] font-bold text-base-white">
            <ExternalLink className="h-3.5 w-3.5" />
            Urgensi Tinggi
          </span>
          {recommended ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-cta px-3 py-1 text-[12px] font-bold text-primary">
              <Trophy className="h-3.5 w-3.5" />
              Rekomendasi BEM
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-[10px] bg-[#dbeafe] px-2.5 py-1 text-[12px] font-semibold text-[#1d4eda]">
              {category === "Workshop" ? <Laptop className="h-3.5 w-3.5" /> : <Trophy className="h-3.5 w-3.5" />}
              {category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-[10px] bg-[#f3f4f6] px-2.5 py-1 text-[12px] font-semibold text-[#64748b]">
              <Globe className="h-3.5 w-3.5" />
              {scope}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-[10px] bg-[#dcfce7] px-2.5 py-1 text-[12px] font-semibold text-[#15803d]">
            Gratis
          </span>
        </div>

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
            {urgency}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex h-10 flex-1 items-center justify-center rounded-[10px] bg-primary px-3 font-tagline text-[15px] font-bold text-base-white sm:text-[16px]"
          >
            Daftar Sekarang
          </button>
          {findTeam ? (
            <button
              type="button"
              className="flex h-10 items-center justify-center gap-2 rounded-[10px] bg-[#e8f4fd] px-4 font-tagline text-[16px] font-semibold text-primary"
            >
              <Users className="h-4 w-4" />
              Cari Tim
            </button>
          ) : null}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#f3f4f6] text-primary"
          >
            <CalendarPlus2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
