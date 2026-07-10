"use client";

import { useTranslation } from "react-i18next";
import { IconUp } from "@/components/common/icons";

/** CTA button row — Figma "mms_B3_Call-To-Action" (About Awards / About Kudos). */
export default function HeroCta() {
  const { t } = useTranslation();

  return (
    // mm:2167:9062
    <div className="flex flex-wrap items-center gap-10 font-(family-name:--font-montserrat)">
      {/* mm:2167:9063 mms_B3.1_Button-IC About */}
      <a
        href="#awards"
        className="flex items-center gap-2 rounded-lg bg-[#FFEA9E] px-6 py-4 text-[22px] leading-[28px] font-bold text-[#00101A]"
      >
        {t("home:hero.cta.aboutAwards")}
        <IconUp className="shrink-0" />
      </a>

      {/* mm:2167:9064 mms_B3.2_Button-IC Kudos */}
      <a
        href="#kudos"
        className="flex items-center gap-2 rounded-lg border border-[#998C5F] bg-[#FFEA9E]/10 px-6 py-4 text-[22px] leading-[28px] font-bold text-white"
      >
        {t("home:hero.cta.aboutKudos")}
        <IconUp className="shrink-0" />
      </a>
    </div>
  );
}
