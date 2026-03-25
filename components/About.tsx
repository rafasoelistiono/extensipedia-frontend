import {
  BookOpen,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

type AboutProps = {
  title: string;
  description: string;
};

export function About({ title, description }: AboutProps) {
  return (
    <section id="tentang-kami" className="bg-base-white">
      <div className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <h2 className="section-title text-center text-[26px] leading-none sm:text-[30px] lg:text-[36px]">
          {title}
        </h2>

        <div className="surface-card mt-8 rounded-[20px] p-4 sm:mt-10 sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr]">
            <div>
              <div className="relative overflow-hidden rounded-[18px] border border-base-grey bg-surface-muted">
                <div
                  className="h-[200px] w-full bg-cover bg-center sm:h-[240px] lg:h-[260px]"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80')",
                  }}
                />

                <button
                  type="button"
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-base-white/90 text-primary shadow-md transition hover:scale-105"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-base-white/90 text-primary shadow-md transition hover:scale-105"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`thumb-${index}`}
                    className="h-12 cursor-pointer rounded-lg border border-base-grey bg-cover bg-center opacity-70 transition hover:opacity-100 sm:h-14"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80')",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="surface-panel flex flex-col justify-center rounded-[18px] px-4 py-5 sm:px-6 sm:py-6">
              <p className="body-paragraph body-copy">&quot;{description}&quot;</p>

              <p className="about-tagline mt-4 text-primary">
                &quot;Gaungkan Asa, Wujudkan Cita&quot;
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button href="#akademik" variant="primary" className="justify-center sm:px-5">
                  <BookOpen className="h-4 w-4" />
                  Akses Bahan Kuliah
                </Button>

                <Button
                  href="#kompetisi-karir"
                  variant="secondary"
                  className="justify-center sm:px-5"
                >
                  <BriefcaseBusiness className="h-4 w-4" />
                  Info Kompetisi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}