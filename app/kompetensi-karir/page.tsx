import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReset } from "@/components/ScrollReset";
import { CompetencyHubClient } from "@/components/hub-page/CompetencyHubClient";
import { HeroBanner } from "@/components/hub-page/HeroBanner";
import {
  getCompetencyAgendas,
  getCompetencyWinnerSlides,
  type CompetencyAgendaItem,
  type CompetencyWinnerSlide,
} from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Kompetensi & Karir Hub | Extensipedia",
};

export default async function KompetensiKarirPage() {
  let items: CompetencyAgendaItem[] = [];
  let winnerSlides: CompetencyWinnerSlide[] = [];

  try {
    const [agendasResponse, winnerSlidesResponse] = await Promise.all([
      getCompetencyAgendas({
        page_size: 50,
        ordering: "-created_at,-updated_at,deadline_date,title",
      }),
      getCompetencyWinnerSlides({
        page_size: 10,
        ordering: "display_order,updated_at",
      }),
    ]);

    items = agendasResponse.data.items;
    winnerSlides = winnerSlidesResponse.data.items;
  } catch {
    items = [];
    winnerSlides = [];
  }

  return (
    <div className="min-h-screen bg-base-white text-primary">
      <ScrollReset />
      <Navbar />

      <main>
        <HeroBanner
          title="Kompetensi & Karir Hub"
          description="Ekosistem terpadu untuk mengembangkan kompetensi akademik dan mengakselerasi perjalanan karirmu sebagai mahasiswa Ekstensi FEB UI."
          backgroundImage="/headers/header-kompetensi-karir.jpg"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Kompetensi & Karir" },
          ]}
          tabs={[
            {
              label: "Competency Hub",
              icon: "trophy",
              active: true,
              href: "/kompetensi-karir",
            },
            { label: "Career Center", icon: "briefcase", href: "/karir" },
          ]}
        />

        <CompetencyHubClient items={items} winnerSlides={winnerSlides} />
      </main>

      <Footer />
    </div>
  );
}
