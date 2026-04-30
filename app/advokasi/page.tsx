import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ScrollReset } from "@/components/ScrollReset";
import {
  SupportHub,
  type PolicyResourceCard,
} from "@/components/support-hub/SupportHub";
import {
  getAdvocacyPolicyResources,
  getFeaturedAspirations,
  getFirstFilledString,
  getFirstResolvedUrl,
  type AdvocacyPolicyResources,
  type FeaturedAspiration,
} from "@/lib/public-api";
import { BadgeAlert, BriefcaseBusiness, FileSpreadsheet } from "lucide-react";

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
  let policyResourcesData: AdvocacyPolicyResources | null = null;

  const [aspirationsResult, policyResourcesResult] = await Promise.allSettled([
    getFeaturedAspirations(),
    getAdvocacyPolicyResources(),
  ]);

  if (aspirationsResult.status === "fulfilled") {
    aspirations = aspirationsResult.value;
  }

  if (policyResourcesResult.status === "fulfilled") {
    policyResourcesData = policyResourcesResult.value.data;
  }

  const policyResources: PolicyResourceCard[] = !policyResourcesData
    ? []
    : [
        {
          title:
            getFirstFilledString(policyResourcesData, ["siak_war_title"]) ?? "Siak WAR",
          description:
            getFirstFilledString(policyResourcesData, ["siak_war_description"]) ??
            "Strategi dan tips jitu untuk memenangkan perang pengambilan mata kuliah di SIAK NG.",
          href:
            getFirstResolvedUrl(policyResourcesData, [
              "siak_war",
              "siak_war_url",
              "siak_war_link",
              "siak_war_resource_url",
            ]) ?? "",
          topTone: "bg-primary",
          iconTone: "bg-[#4451b4] text-base-white",
          icon: FileSpreadsheet,
        },
        {
          title:
            getFirstFilledString(policyResourcesData, ["cicilan_ukt_title"]) ??
            "Cicilan UKT",
          description:
            getFirstFilledString(policyResourcesData, ["cicilan_ukt_description"]) ??
            "Prosedur lengkap pengajuan cicilan UKT, syarat dokumen, dan timeline pengajuan.",
          href:
            getFirstResolvedUrl(policyResourcesData, [
              "cicilan_ukt",
              "cicilan_ukt_url",
              "cicilan_ukt_link",
              "cicilan_ukt_resource_url",
            ]) ?? "",
          topTone: "bg-[#0a5a8a]",
          iconTone: "bg-base-white text-cta",
          icon: BriefcaseBusiness,
        },
        {
          title:
            getFirstFilledString(policyResourcesData, ["alur_skpi_title"]) ?? "Alur SKPI",
          description:
            getFirstFilledString(policyResourcesData, ["alur_skpi_description"]) ??
            "Panduan lengkap pengajuan Surat Keterangan Pendamping Ijazah (SKPI) dan persyaratannya.",
          href:
            getFirstResolvedUrl(policyResourcesData, [
              "alur_skpi",
              "alur_skpi_url",
              "alur_skpi_link",
              "alur_skpi_resource_url",
            ]) ?? "",
          topTone: "bg-primary",
          iconTone: "bg-base-white text-primary",
          icon: BadgeAlert,
        },
      ].filter((item) => item.href);

  return (
    <div className="min-h-screen bg-base-white text-primary">
      <ScrollReset />
      <Navbar />
      <SupportHub
        activeTab={activeTab}
        aspirations={aspirations}
        policyResources={policyResources}
      />
      <Footer />
    </div>
  );
}
