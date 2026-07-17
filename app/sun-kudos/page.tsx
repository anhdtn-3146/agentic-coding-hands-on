import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import SiteHeader from "@/components/homepage/site-header";
import KvBanner from "@/components/kudos-board/kv-banner";
import WriteKudosBar from "@/components/kudos-board/write-kudos-bar";
import HighlightSection from "@/components/kudos-board/highlight-section";
import SpotlightSection from "@/components/kudos-board/spotlight-section";
import AllKudosSection from "@/components/kudos-board/all-kudos-section";
import SiteFooter from "@/components/homepage/site-footer";

// SAA brand font, exposed as --font-montserrat for the kudos-board components
// (same pattern as app/page.tsx and app/award-info/page.tsx).
const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Sun* Kudos — Sun* Annual Awards 2025",
  description:
    "Sun* Kudos Live board — hệ thống ghi nhận lời cảm ơn SAA 2025: Highlight Kudos, Spotlight board và All Kudos.",
};

/**
 * Sun* Kudos Live board — Figma "Sun* Kudos - Live board" (2940:13431,
 * screen MaZUn5xHXZ). Presentational + client-interactive with design-sourced
 * mock data (no backend). Section order per design: KV banner → write bar →
 * Highlight carousel → Spotlight board → All Kudos feed + stats sidebar.
 * Reuses the shared homepage chrome (header, footer, floating widget).
 */
export default function SunKudosPage() {
  return (
    <div
      className={`${montserrat.variable} relative min-h-screen w-full bg-[#00101A]`}
    >
      <SiteHeader />
      <main className="flex flex-col gap-20 pb-24">
        <KvBanner />
        <WriteKudosBar />
        <HighlightSection />
        <SpotlightSection />
        <AllKudosSection />
      </main>
      <SiteFooter />
    </div>
  );
}
