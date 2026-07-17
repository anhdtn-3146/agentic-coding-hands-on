"use client";

import { useTranslation } from "react-i18next";
import type { SpotlightNameNodeData } from "./spotlight-mock-data";

interface SpotlightNameNodeProps {
  data: SpotlightNameNodeData;
  isHovered: boolean;
  onHoverChange: (id: string | null) => void;
}

/**
 * Single recipient name inside the Spotlight word cloud. Absolute-positioned
 * by percentage (matches the design's scattered layout). Hover reveals a
 * small tooltip with the name + a mock "received at" time (design pattern:
 * node 2940:14230 "08:30PM {name} đã nhận được một Kudos mới").
 *
 * Click is intentionally a no-op — the recipient detail page doesn't exist
 * yet (see clarifications.md) — but the pointer cursor is kept so the node
 * still reads as interactive per the design.
 */
export default function SpotlightNameNode({
  data,
  isHovered,
  onHoverChange,
}: SpotlightNameNodeProps) {
  const { t } = useTranslation();
  const name = data.name.trim();

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${data.xPct}%`, top: `${data.yPct}%` }}
    >
      <button
        type="button"
        aria-label={name}
        onMouseEnter={() => onHoverChange(data.id)}
        onMouseLeave={() => onHoverChange(null)}
        onFocus={() => onHoverChange(data.id)}
        onBlur={() => onHoverChange(null)}
        onClick={(event) => event.preventDefault()}
        className={`font-(family-name:--font-montserrat) cursor-pointer font-bold whitespace-nowrap transition-colors hover:text-[#FFEA9E] ${
          data.accent ? "text-[#F17676]" : "text-white"
        }`}
        style={{ fontSize: data.size === "md" ? "11px" : "7px" }}
      >
        {name}
      </button>

      {isHovered && (
        <div
          role="tooltip"
          className="font-(family-name:--font-montserrat) pointer-events-none absolute bottom-full left-1/2 z-30 mb-1.5 w-max max-w-40 -translate-x-1/2 rounded-lg border border-[#998C5F] bg-[#00101A] px-3 py-1.5 text-[11px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
        >
          <p className="font-bold text-[#FFEA9E]">{name}</p>
          <p className="text-white">
            {t("kudosSpotlight:tooltip.receivedAt", { time: data.receivedAt })}
          </p>
        </div>
      )}
    </div>
  );
}
