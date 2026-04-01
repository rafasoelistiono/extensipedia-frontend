import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReset } from "@/components/ScrollReset";
import { CompetencyHubClient } from "@/components/hub-page/CompetencyHubClient";
import { HeroBanner } from "@/components/hub-page/HeroBanner";
import { getCompetencyAgendas, type CompetencyAgendaItem } from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Kompetensi & Karir Hub | Extensipedia",
};

export default async function KompetensiKarirPage() {
  let items: CompetencyAgendaItem[] = [];

  try {
    const response = await getCompetencyAgendas({
      page_size: 50,
      ordering: "-created_at,-updated_at,deadline_date,title",
    });
    items = response.data.items;
  } catch {
    items = [];
  }

  return (
    <div className="min-h-screen bg-base-white text-primary">
      <ScrollReset />
      <Navbar />

      <main>
        <HeroBanner
          title="Kompetensi & Karir Hub"
          description="Ekosistem terpadu untuk mengembangkan kompetensi akademik dan mengakselerasi perjalanan karirmu sebagai mahasiswa Ekstensi FEB UI."
          backgroundImage="/about/hero-bg.png"
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

        <CompetencyHubClient items={items} />
      </main>

      <Footer />
    </div>
  );
}
