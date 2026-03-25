import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReset } from "@/components/ScrollReset";
import { SupportHub } from "@/components/support-hub/SupportHub";
import {
  fallbackFeaturedAspirations,
  getFeaturedAspirations,
  type FeaturedAspiration,
} from "@/lib/public-api";

export const metadata: Metadata = {
  title: "Support Hub | Extensipedia",
};

type AdvokasiPageProps = {
  searchParams?: Promise<{
    tab?: string;
  }>;
};

export default async function AdvokasiPage({ searchParams }: AdvokasiPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const activeTab = resolvedSearchParams?.tab === "lacak" ? "lacak" : "aspirasi";
  let aspirations: FeaturedAspiration[] = [];

  try {
    aspirations = await getFeaturedAspirations();
  } catch {
    aspirations = fallbackFeaturedAspirations;
  }

  return (
    <div className="min-h-screen bg-base-white text-primary">
      <ScrollReset />
      <Navbar />
      <SupportHub activeTab={activeTab} aspirations={aspirations} />
      <Footer />
    </div>
  );
}
