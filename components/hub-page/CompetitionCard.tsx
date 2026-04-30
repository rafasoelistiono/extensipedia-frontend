import {
  CalendarDays,
  CalendarPlus2,
  CircleAlert,
  ExternalLink,
  Globe,
  Laptop,
  Trophy,
  Users,
} from "lucide-react";

type CompetitionCardProps = {
  title: string;
  description: string;
  deadline: string;
  countdownLabel: string;
  category: string;
  scope: string;
  pricing: string;
  urgency?: boolean;
  recommended?: boolean;
  registrationLink?: string | null;
  teamFindingLink?: string | null;
  googleCalendarLink?: string | null;
  tone?: "primary" | "sky" | "green";
};

const toneClassMap = {
  primary: "bg-primary",
  sky: "bg-[#0a5a8a]",
  green: "bg-[#1a6b3c]",
} as const;

function normalizeTag(value: string) {
  return value.trim().toLowerCase();
}

export function CompetitionCard({
  title,
  description,
  deadline,
  countdownLabel,
  category,
  scope,
  pricing,
  urgency = false,
  recommended = false,
  registrationLink,
  teamFindingLink,
  googleCalendarLink,
  tone = "primary",
}: CompetitionCardProps) {
  const isWorkshop = normalizeTag(category) === "workshop";
  const isCompetition = normalizeTag(category) === "lomba";
  const hasRegistrationLink = Boolean(registrationLink);
  const hasTeamFindingLink = Boolean(teamFindingLink?.trim()) && isCompetition;
  const hasCalendarLink = Boolean(googleCalendarLink);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[18px] bg-base-white shadow-[0_4px_17px_rgba(0,0,0,0.1)] sm:rounded-[20px]">
      <div className={`flex min-h-[170px] items-end px-4 pb-4 sm:min-h-[220px] ${toneClassMap[tone]}`}>
        <div className="flex flex-wrap gap-2">
          {urgency ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#ea4445] px-3 py-1 text-[12px] font-bold text-base-white">
              <CircleAlert className="h-3.5 w-3.5" />
              Urgensi Tinggi
            </span>
          ) : null}
          {recommended ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-cta px-3 py-1 text-[12px] font-bold text-primary">
              <Trophy className="h-3.5 w-3.5" />
              Rekomendasi
            </span>
          ) : null}
          {!urgency && !recommended ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-base-white/15 px-3 py-1 text-[12px] font-semibold text-base-white">
              Agenda Kompetensi
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-[10px] bg-[#dbeafe] px-2.5 py-1 text-[12px] font-semibold text-[#1d4eda]">
            {isWorkshop ? (
              <Laptop className="h-3.5 w-3.5" />
            ) : (
              <Trophy className="h-3.5 w-3.5" />
            )}
            {category}
          </span>
          <span className="inline-flex items-center gap-1 rounded-[10px] bg-[#f3f4f6] px-2.5 py-1 text-[12px] font-semibold text-[#64748b]">
            <Globe className="h-3.5 w-3.5" />
            {scope}
          </span>
          <span className="inline-flex items-center gap-1 rounded-[10px] bg-[#dcfce7] px-2.5 py-1 text-[12px] font-semibold text-[#15803d]">
            {pricing}
          </span>
        </div>

        <div>
          <h3 className="font-headline text-[20px] leading-tight text-primary">
            {title}
          </h3>
        </div>

        <p className="font-body text-[14px] leading-6 text-[#64748b]">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 rounded-[10px] bg-surface-muted px-4 py-3">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-copy-soft" />
            <div>
              <div className="font-tagline text-[10px] text-copy-soft">DEADLINE</div>
              <div className="font-tagline text-[16px] font-bold text-primary">{deadline}</div>
            </div>
          </div>
          <span className="rounded-[8px] bg-[#e8f4fd] px-3 py-1 text-[12px] font-bold text-primary">
            {countdownLabel}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={registrationLink ?? "#"}
            target={hasRegistrationLink ? "_blank" : undefined}
            rel={hasRegistrationLink ? "noreferrer" : undefined}
            aria-disabled={!hasRegistrationLink}
            className={[
              "flex h-10 flex-1 items-center justify-center rounded-[10px] px-3 font-tagline text-[15px] font-bold whitespace-nowrap sm:text-[16px]",
              hasRegistrationLink
                ? "bg-primary !text-base-white"
                : "cursor-not-allowed bg-[#e5e7eb] text-[#94a3b8]",
            ].join(" ")}
          >
            Daftar Sekarang
          </a>
          {hasTeamFindingLink ? (
            <a
              href={teamFindingLink ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 items-center justify-center gap-2 rounded-[10px] bg-[#eef4fb] px-4 font-tagline text-[14px] font-semibold whitespace-nowrap text-primary sm:text-[15px]"
            >
              <Users className="h-4 w-4" />
              Cari Tim
            </a>
          ) : null}
          <a
            href={googleCalendarLink ?? "#"}
            target={hasCalendarLink ? "_blank" : undefined}
            rel={hasCalendarLink ? "noreferrer" : undefined}
            aria-disabled={!hasCalendarLink}
            className={[
              "flex h-10 w-10 items-center justify-center rounded-[10px]",
              hasCalendarLink
                ? "bg-[#f3f4f6] text-primary"
                : "cursor-not-allowed bg-[#e5e7eb] text-[#94a3b8]",
            ].join(" ")}
          >
            {hasCalendarLink ? (
              <CalendarPlus2 className="h-4 w-4" />
            ) : (
              <ExternalLink className="h-4 w-4" />
            )}
          </a>
        </div>
      </div>
    </article>
  );
}
