import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import SiteHeader from "@/components/homepage/site-header";
import KeyvisualBanner from "@/components/awards/keyvisual-banner";
import CategoryNav from "@/components/awards/category-nav";
import AwardDetailSection from "@/components/awards/award-detail-section";
import SunkudosSection from "@/components/homepage/sunkudos-section";
import SiteFooter from "@/components/homepage/site-footer";

// SAA brand font, exposed as --font-montserrat for the awards components
// below (same pattern as app/page.tsx).
const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Hệ thống giải thưởng — Sun* Annual Awards 2025",
  description:
    "Hệ thống giải thưởng SAA 2025 — Sun* Annual Awards 2025. Chi tiết 6 hạng mục giải thưởng.",
};

/**
 * Awards page — Figma "Hệ thống giải" (313:8436). Presentational, no auth
 * guard (matches the unguarded homepage `/`; a real guard is deferred to a
 * later auth epic per plan clarifications). Composes the keyvisual hero,
 * the sticky category nav + award detail list, and the shared Sun* Kudos
 * promo + footer + widget button already used on the homepage.
 */
export default function AwardsPage() {
  return (
    <div
      className={`${montserrat.variable} relative min-h-screen w-full bg-[#00101A]`}
    >
      <SiteHeader />
      <main className="flex flex-col gap-30 pb-24">
        <KeyvisualBanner />

        {/* mm:313:8458 mms_B_Hệ thống giải thưởng — 144px side padding (px-36). */}
        <div className="mx-auto flex w-full max-w-[1440px] flex-row items-start justify-between gap-20 px-36">
          <CategoryNav />
          <AwardDetailSection />
        </div>

        <SunkudosSection />
      </main>
      <SiteFooter />
    </div>
  );
}
