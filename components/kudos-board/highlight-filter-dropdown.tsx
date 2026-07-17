"use client";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomSvgIcon from "@/components/common/custom-svg-icon";
import { useClickOutside } from "@/hooks/use-click-outside";

export interface HighlightFilterDropdownProps {
  label: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}

/**
 * "Hashtag" / "Phòng ban" filter button — Figma "B.1.1_ButtonHashtag" /
 * "B.1.2_Button Phong ban" (both instance of componentId 186:2757). Opens a
 * small option panel on click; selecting an option filters the carousel and
 * clicking the active option again clears it.
 */
export default function HighlightFilterDropdown({
  label,
  options,
  selected,
  onSelect,
}: HighlightFilterDropdownProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useClickOutside(rootRef, () => setOpen(false), open);

  return (
    <div ref={rootRef} className="relative">
      {/* mm:2940:13459 / mm:2940:13460 */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded border border-[#998C5F] bg-[#FFEA9E]/10 px-4 py-4 transition-colors hover:bg-[#FFEA9E]/20"
      >
        <span className="font-(family-name:--font-montserrat) text-base leading-6 font-bold tracking-[0.15px] whitespace-nowrap text-white">
          {selected ?? label}
        </span>
        {/* mm:I2940:13459;186:2761 MM_MEDIA_Down */}
        <CustomSvgIcon
          src="/kudos/highlight/down.svg"
          className={`h-6 w-6 text-white transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 z-20 mt-2 min-w-[180px] rounded-lg border border-[#998C5F] bg-[#101417] py-2 shadow-xl">
          {options.length === 0 ? (
            <p className="px-4 py-2 text-sm text-[#999999]">
              {t("kudosBoard:highlight.filters.empty")}
            </p>
          ) : (
            options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onSelect(selected === option ? null : option);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 text-left text-sm font-bold hover:bg-[#FFEA9E]/10 ${
                  selected === option ? "text-[#FFEA9E]" : "text-white"
                }`}
              >
                {option}
              </button>
            ))
          )}
          {selected && (
            <button
              type="button"
              onClick={() => {
                onSelect(null);
                setOpen(false);
              }}
              className="mt-1 block w-full border-t border-[#2E3940] px-4 py-2 text-left text-sm font-bold text-[#999999] hover:bg-[#FFEA9E]/10"
            >
              {t("kudosBoard:highlight.filters.clear")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
