"use client";

import { useState } from "react";
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

const aboutGallery = [
  {
    src: "/headers/header-akademik.jpg",
    alt: "Kegiatan akademik mahasiswa Program Ekstensi FEB UI",
  },
  {
    src: "/headers/header-kompetensi-karir.jpg",
    alt: "Kegiatan kompetensi dan karir mahasiswa Program Ekstensi FEB UI",
  },
  {
    src: "/headers/header-advokasi.jpg",
    alt: "Kegiatan advokasi mahasiswa Program Ekstensi FEB UI",
  },
  {
    src: "/headers/about-gallery-dscf7980.jpg",
    alt: "Potret kebersamaan mahasiswa Program Ekstensi FEB UI",
  },
];

export function About({ title, description }: AboutProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = aboutGallery[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? aboutGallery.length - 1 : current - 1,
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === aboutGallery.length - 1 ? 0 : current + 1,
    );
  };

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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="h-[200px] w-full object-cover sm:h-[240px] lg:h-[260px]"
                />

                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Lihat foto sebelumnya"
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-base-white/90 text-primary shadow-md transition hover:scale-105"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Lihat foto berikutnya"
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-base-white/90 text-primary shadow-md transition hover:scale-105"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 grid grid-cols-4 gap-2">
                {aboutGallery.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Pilih foto ${index + 1}`}
                    className={[
                      "overflow-hidden rounded-lg border transition sm:h-14",
                      activeIndex === index
                        ? "border-primary opacity-100 ring-2 ring-primary/20"
                        : "border-base-grey opacity-70 hover:opacity-100",
                    ].join(" ")}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-12 w-full object-cover sm:h-14"
                    />
                  </button>
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
