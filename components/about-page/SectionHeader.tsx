type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      <p className="font-tagline text-[15px] font-bold uppercase tracking-[0.18em] text-cta sm:text-[18px]">
        {eyebrow}
      </p>
      <h2 className="section-title text-[34px] leading-none sm:text-[42px] lg:text-[48px]">
        {title}
      </h2>
      {description ? (
        <p className="font-tagline text-[16px] font-normal leading-normal text-primary sm:text-[18px]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
