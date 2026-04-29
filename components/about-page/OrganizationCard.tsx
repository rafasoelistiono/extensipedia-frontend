import { Instagram, Linkedin } from "lucide-react";

type OrganizationCardProps = {
  name: string;
  role: string;
  unit: string;
  image: string;
  imageClassName?: string;
};

export function OrganizationCard({
  name,
  role,
  unit,
  image,
  imageClassName,
}: OrganizationCardProps) {
  return (
    <article className="surface-card flex min-h-[298px] w-[282px] shrink-0 flex-col items-center rounded-[13px] border border-panel-border px-[10px] py-[30px]">
      <div className="relative mb-[13px] h-[118px] w-[118px] overflow-visible rounded-[28px] bg-primary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          loading="lazy"
          className={[
            "pointer-events-none absolute bottom-0 left-1/2 h-[150px] w-auto max-w-none -translate-x-1/2 object-contain",
            imageClassName ?? "",
          ].join(" ")}
        />
      </div>

      <div className="flex flex-col items-center gap-[10px] text-center">
        <h3 className="font-tagline text-[18px] font-bold leading-normal text-primary">
          {name}
        </h3>
        <p className="font-tagline text-[18px] font-normal leading-normal text-copy-muted">
          {role}
        </p>
      </div>

      <span className="mt-3 rounded-full bg-primary px-[9px] py-[5px] font-tagline text-[12px] font-normal leading-none text-base-white">
        {unit}
      </span>

      <div className="mt-4 flex gap-[13px]">
        <a
          href="#"
          className="flex h-8 w-[120px] items-center justify-center gap-2 rounded-[8px] border border-primary bg-base-white font-tagline text-[15px] font-medium text-primary"
        >
          <Instagram className="h-4 w-4" />
          Instagram
        </a>
        <a
          href="#"
          className="flex h-8 w-[120px] items-center justify-center gap-2 rounded-[8px] border border-primary bg-base-white font-tagline text-[15px] font-medium text-primary"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </div>
    </article>
  );
}
