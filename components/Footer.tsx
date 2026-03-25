import { Instagram, Mail, MessageCircleMore } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer>
      <div className="bg-primary text-base-white">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div className="text-center md:text-left">
              <div className="flex flex-col items-center gap-3 md:flex-row md:items-start">
                <div className="h-14 w-auto">
                  <Image
                    src="/gcb-logo.svg"
                    alt="Logo GCB"
                    width={180}
                    height={56}
                    className="h-14 w-auto object-contain"
                  />
                </div>

                <div>
                  <div className="font-headline text-[22px] leading-none text-base-white sm:text-[28px]">
                    BEM PE FEB UI 2026
                  </div>
                  <div className="mt-1 text-sm text-base-white/85">
                    Kabinet Gema Cita Bersama
                  </div>
                </div>
              </div>

              <div className="mt-5 font-tagline text-[15px] font-medium text-cta">
                &quot;Gaungkan Asa, Wujudkan Cita&quot;
              </div>

              <p className="mx-auto mt-4 max-w-md text-[12px] leading-6 text-base-white/72 md:mx-0">
                Gedung Program Ekstensi Kampus Salemba UI, Sumitra
                Djojohadikusumo Jl. Salemba Raya 4 Kampus UI Salemba 10430
                Indonesia
              </p>
            </div>

            <div className="text-center md:text-left md:justify-self-end">
              <h4 className="font-tagline text-sm font-semibold text-base-white">
                Terhubung Bersama Kami
              </h4>

              <div className="mt-4 space-y-3 text-[13px] text-base-white/88">
                <a
                  href="https://www.instagram.com/bempefebui/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 transition hover:text-cta md:justify-start"
                >
                  <Instagram className="h-4 w-4" />
                  @bempefebui
                </a>

                <a
                  href="https://www.youtube.com/@extensipedia"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 transition hover:text-cta md:justify-start"
                >
                  <MessageCircleMore className="h-4 w-4" />
                  Extensipedia by BEM PE FEB UI
                </a>

                <a
                  href="mailto:bempefebui@gmail.com"
                  className="flex items-center justify-center gap-3 transition hover:text-cta md:justify-start"
                >
                  <Mail className="h-4 w-4" />
                  bempefebui@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-cta py-2 text-center text-[11px] text-primary">
        Copyright © 2026 BEM PE FEB UI - Gema Cita Bersama. All rights reserved.
      </div>
    </footer>
  );
}
