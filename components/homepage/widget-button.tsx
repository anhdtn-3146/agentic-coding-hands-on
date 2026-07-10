"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "@/hooks/use-click-outside";
import SaaRulesDrawer from "./saa-rules-drawer";
import KudosFormModal from "../kudos/kudos-form-modal";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["700"],
});

/** Shared quick-action item styling (dropdown menu rows). */
const ACTION_CLASS = "px-4 py-2 text-left text-sm font-bold hover:bg-[#00101A]/10";

function IconPen(props: React.SVGProps<SVGSVGElement>) {
  return (
    // mm:I5022:15169;214:3839;186:1763
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
 * Floating "widget" button (viết kudos / thể lệ SAA quick actions).
 *
 * NOTE: Figma marks this node with `position: absolute; top: 830px; right: 19px`
 * relative to the full page frame, which is how a static mockup represents an
 * element meant to stay visible while scrolling. Anchoring literally at
 * `top: 830px` would misplace it on viewports shorter/taller than the design
 * canvas, so this is implemented as a viewport-fixed bottom-right widget
 * (the conventional behavior for this kind of persistent action button),
 * keeping the exact horizontal offset (`right: 19px`) and box-shadow from Figma.
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

  // Clicking outside or Esc closes the quick-actions dropdown.
  useClickOutside(containerRef, () => setIsOpen(false), isOpen);

  return (
    <>
    {/* mm:5022:15169 */}
    <div
      ref={containerRef}
      className="fixed bottom-6 z-50 flex flex-col items-end gap-3"
      style={{ right: "19px" }}
    >
      {/* Quick-actions dropdown — presentational only, on-page scroll links */}
      {isOpen && (
        <div
          role="menu"
          className={`${montserrat.className} flex w-48 flex-col overflow-hidden rounded-xl bg-[#FFEA9E] py-2 text-[#00101A]`}
          style={{
            boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25), 0 0 6px 0 #FAE287",
          }}
        >
          {/* Viết Kudos — opens the Kudos form modal. */}
          <button
            type="button"
            role="menuitem"
            className={ACTION_CLASS}
            onClick={() => {
              setIsOpen(false);
              setKudosOpen(true);
            }}
          >
            {t("common:widget.writeKudos")}
          </button>
          {/* Thể lệ SAA — opens the rules drawer. */}
          <button
            type="button"
            role="menuitem"
            className={ACTION_CLASS}
            onClick={() => {
              setIsOpen(false);
              setRulesOpen(true);
            }}
          >
            {t("common:widget.saaRules")}
          </button>
        </div>
      )}

      {/* mm:I5022:15169;214:3839 — pill 106x64, gold drop-shadow follows the
          rounded shape (filter, not box-shadow, to avoid a rectangular glow). */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-16 w-26.5 items-center gap-2 rounded-full bg-[#FFEA9E] p-4"
        style={{
          filter:
            "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 0px 6px #FAE287)",
        }}
      >
        {/* mm:I5022:15169;214:3839;186:1935 */}
        <span className="flex items-center gap-2 text-[#00101A]">
          {/* mm:I5022:15169;214:3839;186:1763 */}
          <IconPen className="h-6 w-6" />
          {/* mm:I5022:15169;214:3839;186:1568 */}
          <span
            className={`${montserrat.className} text-2xl font-bold leading-8`}
          >
            /
          </span>
        </span>
        {/* mm:I5022:15169;214:3839;186:1766 -> mm:I5022:15169;214:3839;186:1766;214:3762 */}
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
