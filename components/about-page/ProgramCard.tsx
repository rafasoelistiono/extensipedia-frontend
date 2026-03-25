import type { LucideIcon } from "lucide-react";

type ProgramCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function ProgramCard({
  icon: Icon,
  title,
  description,
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
    </article>
  );
}
