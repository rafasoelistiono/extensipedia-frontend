import Image from "next/image";
import { BookOpen, BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 scale-[1.03] bg-cover bg-center blur-[3px]"
        style={{ backgroundImage: "url('/hero-campus.jpg')" }}
      />
      <div className="page-hero-tint absolute inset-0" />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative mx-auto flex min-h-[430px] w-full max-w-[1440px] items-start justify-center px-4 pb-16 pt-12 text-center sm:min-h-[540px] sm:px-6 sm:pb-24 sm:pt-16 lg:px-8 lg:pt-20">
        <div className="flex w-full max-w-4xl flex-col items-center">
          <div className="hero-chip inline-flex rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cta sm:px-5 sm:text-[11px]">
            BEM PE FEB UI
          </div>

          <div className="mt-5 flex items-center justify-center sm:mt-6">
            <Image
              src="/logo-extensipedia.png"
              alt="Extensipedia"
              width={836}
              height={187}
              className="h-auto w-[300px] drop-shadow-[0_10px_30px_rgba(3,57,93,0.28)] sm:w-[430px] lg:w-[620px]"
              priority
            />
          </div>

          <div className="font-tagline mx-auto mt-5 inline-flex max-w-[330px] rounded-[16px] bg-base-white px-4 py-2 text-center text-[12px] font-semibold leading-5 text-primary shadow-lg shadow-primary/10 sm:max-w-none sm:px-5 sm:py-2.5 sm:text-[14px]">
            Pusat Keunggulan Akademik Mahasiswa Ekstensi
          </div>

          <div className="mt-7 flex w-full flex-col items-center gap-3 sm:mt-8 sm:flex-row sm:justify-center">
            <Button
              href="#akademik"
              variant="primary"
              className="min-h-[48px] w-full max-w-[320px] justify-center rounded-[18px] px-5 py-3 text-[14px] sm:w-auto sm:max-w-none"
            >
              <BookOpen className="h-4 w-4" />
              Akses Bahan Kuliah
            </Button>

            <Button
              href="#kompetisi-karir"
              variant="secondary"
              className="min-h-[48px] w-full max-w-[320px] justify-center rounded-[18px] px-5 py-3 text-[14px] sm:w-auto sm:max-w-none"
            >
              <BriefcaseBusiness className="h-4 w-4" />
              Info Kompetisi
            </Button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-base-white to-transparent sm:h-24" />
    </section>
  );
}
