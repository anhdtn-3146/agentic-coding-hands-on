"use client";

import Image from "next/image";
import { Montserrat, Montserrat_Alternates } from "next/font/google";
import { useTranslation } from "react-i18next";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["700"],
  display: "swap",
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

/**
 * Site footer for the Homepage SAA screen: brand logo, secondary nav links
 * and copyright notice. Presentational only -- content is mock data
 * extracted verbatim from Figma, no client state, no real navigation targets.
 */
export default function SiteFooter() {
  const { t } = useTranslation();

  return (
    // mm:5001:14800
    <footer className="w-full border-t border-[#2E3940] bg-[#00101A] px-22.5 py-10">
      <div className="mx-auto flex w-full max-w-[1224px] items-center justify-between gap-8">
        {/* mm:I5001:14800;342:1407 */}
        <div className="flex items-center gap-20">
          {/* mm:I5001:14800;342:1408 */}
          <a href="#about" aria-label="Sun* Annual Awards 2025 home" className="h-16 w-[69px]">
            {/* mm:I5001:14800;342:1408;178:1030 */}
            <Image
              src="/homepage-saa/Footer_Logo.png"
              alt="Sun* Annual Awards 2025"
              width={69}
              height={64}
            />
          </a>
          {/* mm:I5001:14800;342:1409 */}
          <nav className={`${montserrat.className} flex items-center gap-12 whitespace-nowrap`}>
            {/* mm:I5001:14800;342:1410 */}
            <a
              href="#about"
              className="rounded p-4 text-base leading-6 font-bold tracking-[0.15px] text-white transition-colors duration-200 hover:bg-white/10"
            >
              {t("nav:aboutSaa")}
            </a>
            {/* mm:I5001:14800;342:1411 */}
            <a
              href="#awards"
              className="rounded bg-[#FFEA9E]/10 p-4 text-base leading-6 font-bold tracking-[0.15px] text-white [text-shadow:0_4px_4px_rgba(0,0,0,0.25),0_0_6px_#FAE287]"
            >
              {t("nav:awardInformation")}
            </a>
            {/* mm:I5001:14800;342:1412 */}
            <a
              href="#kudos"
              className="rounded p-4 text-base leading-6 font-bold tracking-[0.15px] text-white transition-colors duration-200 hover:bg-white/10"
            >
              {t("nav:sunKudos")}
            </a>
            {/* mm:I5001:14800;1161:9487 */}
            <a
              href="#about"
              className="rounded p-4 text-base leading-6 font-bold tracking-[0.15px] text-white transition-colors duration-200 hover:bg-white/10"
            >
              {t("nav:generalStandards")}
            </a>
          </nav>
        </div>

        {/* mm:I5001:14800;342:1413 */}
        <p className={`${montserratAlternates.className} text-center text-base leading-6 font-bold text-white`}>
          {t("common:copyright")}
        </p>
      </div>
    </footer>
  );
}
