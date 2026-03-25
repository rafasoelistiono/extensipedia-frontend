"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", match: "/" },
  { label: "Tentang Kami", href: "/tentang-kami", match: "/tentang-kami" },
  { label: "Akademik", href: "/akademik", match: "/akademik" },
  {
    label: "Kompetensi & Karir",
    href: "/kompetensi-karir",
    match: "/kompetensi-karir",
  },
  { label: "Advokasi", href: "/advokasi", match: "/advokasi" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (match: string) => {
    if (match === "/") {
      return pathname === "/";
    }

    return pathname === match;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-[0_3px_9px_rgba(0,0,0,0.25)]">
      <nav className="mx-auto flex h-[73px] w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setIsOpen(false)}>
          <Image
            src="/header-logo-2.png"
            alt="Logo Extensipedia"
            width={56}
            height={56}
            className="h-10 w-10 object-contain sm:h-[55px] sm:w-[55px]"
            priority
          />
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-base-white lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <div className="hidden items-center lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.match);

            return (
              <Link
                key={item.label}
                href={item.href}
                className="group relative flex h-[73px] items-center justify-center px-6"
              >
                <span
                  className={[
                    "font-tagline relative z-10 text-center text-[17px] font-medium leading-none transition-colors duration-300",
                    active ? "text-cta" : "text-base-white",
                  ].join(" ")}
                >
                  {item.label}
                </span>
                <span
                  className={[
                    "absolute bottom-[12px] left-1/2 h-1 -translate-x-1/2 rounded-full bg-cta transition-all duration-300 ease-out",
                    active ? "w-[70%] opacity-100" : "w-0 opacity-0 group-hover:w-[38%] group-hover:opacity-70",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute inset-x-2 bottom-[7px] top-[7px] rounded-[14px] bg-base-white/0 transition-colors duration-300",
                    active ? "bg-base-white/[0.04]" : "group-hover:bg-base-white/[0.03]",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </div>
      </nav>

      {isOpen ? (
        <div className="border-t border-base-white/10 bg-primary lg:hidden">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col px-4 py-3 sm:px-6">
            {navItems.map((item) => {
              const active = isActive(item.match);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={[
                    "rounded-xl px-3 py-3 font-tagline text-[17px] font-medium transition-colors duration-200",
                    active
                      ? "bg-base-white/5 !text-white"
                      : "!text-white hover:bg-base-white/5",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}
