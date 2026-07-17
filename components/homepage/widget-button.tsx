"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "@/hooks/use-click-outside";
import CustomSvgIcon from "@/components/common/custom-svg-icon";
import SaaRulesDrawer from "./saa-rules-drawer";
import KudosFormModal from "../kudos/kudos-form-modal";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["700"],
});

/** Expanded-state action pill — gold, 64px tall, icon + label (mm frame 7052). */
const ACTION_PILL =
  "flex h-16 items-center gap-2 rounded-[4px] bg-[#FFEA9E] px-4 text-2xl font-bold leading-8 text-[#00101A]";
/** Soft drop-shadow + gold glow shared by the pills (effects not in MCP node data). */
const PILL_SHADOW = {
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 6px #FAE287",
};

function IconPen(props: React.SVGProps<SVGSVGElement>) {
  return (
    // mm:I313:9140;214:3732;186:1763
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M20.8067 6.72951C21.1967 6.33951 21.1967 5.68951 20.8067 5.31951L18.4667 2.97951C18.0967 2.58951 17.4467 2.58951 17.0567 2.97951L15.2167 4.80951L18.9667 8.55951M3.09668 16.9395V20.6895H6.84668L17.9067 9.61951L14.1567 5.86951L3.09668 16.9395Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Floating "widget" button (viết kudos / thể lệ quick actions).
 *
 * Closed: a single gold pill trigger. Open (mm frame 7052 "Floating Action
 * Button - phim nổi chức năng 2"): two labelled gold action pills — "Thể lệ"
 * (flash icon → rules drawer) and "Viết KUDOS" (pen → kudos form) — above a
 * round red "×" close button that replaces the trigger while open.
 *
 * NOTE: Figma anchors this at `top: 830px; right: 19px` on the full page frame,
 * which is how a static mockup represents a scroll-persistent element. Anchoring
 * literally would misplace it across viewports, so it stays viewport-fixed at
 * the bottom-right, keeping the exact horizontal offset (`right: 19px`).
 */
export default function WidgetButton() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [kudosOpen, setKudosOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // "Viết KUDOS" from the rules drawer: close it, then open the Kudos form.
  const handleWriteKudos = () => {
    setRulesOpen(false);
    setKudosOpen(true);
  };

  // Clicking outside or Esc collapses the expanded FAB.
  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  return (
    <>
      {/* mm:313:9140 — gap 20px, right-aligned, bottom-right */}
      <div
        ref={containerRef}
        className="fixed bottom-6 z-50 flex flex-col items-end gap-5"
        style={{ right: "19px" }}
      >
        {isOpen ? (
          <>
            {/* mm:I313:9140;214:3799 A_Button thể lệ */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setRulesOpen(true);
              }}
              className={`${montserrat.className} ${ACTION_PILL}`}
              style={PILL_SHADOW}
            >
              {/* mm:I313:9140;214:3799;186:1763 MM_MEDIA_LOGO (flash) */}
              <CustomSvgIcon src="/icons/widget-flash.svg" className="h-6 w-6" />
              {t("common:widget.saaRules")}
            </button>

            {/* mm:I313:9140;214:3732 B_Button viết kudos */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setKudosOpen(true);
              }}
              className={`${montserrat.className} ${ACTION_PILL}`}
              style={PILL_SHADOW}
            >
              {/* mm:I313:9140;214:3732;186:1763 MM_MEDIA_Pen */}
              <IconPen className="h-6 w-6" />
              {t("common:widget.writeKudos")}
            </button>

            {/* mm:I313:9140;214:3827 C_Button huỷ — red round close */}
            <button
              type="button"
              aria-label={t("common:widget.close")}
              onClick={() => setIsOpen(false)}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4271D] text-white"
              style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
            >
              {/* mm:I313:9140;214:3827;186:1766 MM_MEDIA_Close */}
              <CustomSvgIcon src="/icons/widget-close.svg" className="h-6 w-6" />
            </button>
          </>
        ) : (
          /* Closed trigger pill — pill 106x64, gold drop-shadow follows the
             rounded shape (filter, not box-shadow, to avoid a rectangular glow). */
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
            className="flex h-16 w-26.5 items-center gap-2 rounded-full bg-[#FFEA9E] p-4"
            style={{
              filter:
                "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 0px 6px #FAE287)",
            }}
          >
            <span className="flex items-center gap-2 text-[#00101A]">
              <IconPen className="h-6 w-6" />
              <span
                className={`${montserrat.className} text-2xl font-bold leading-8`}
              >
                /
              </span>
            </span>
            <span className="relative h-6 w-6 shrink-0">
              <Image
                src="/icons/kudos_logo_small.svg"
                alt={t("common:widget.saaRules")}
                fill
                sizes="24px"
                className="object-contain"
              />
            </span>
          </button>
        )}
      </div>

      <SaaRulesDrawer
        open={rulesOpen}
        onClose={() => setRulesOpen(false)}
        onWriteKudos={handleWriteKudos}
      />

      <KudosFormModal open={kudosOpen} onClose={() => setKudosOpen(false)} />
    </>
  );
}
