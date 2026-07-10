"use client";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "@/hooks/use-click-outside";
import { MOCK_SUNNERS } from "./kudos-mock-data";

export interface KudosRecipientSelectProps {
  /** Currently selected recipient name, "" if none has been picked yet. */
  value: string;
  /** Called with the chosen Sunner's name when the user picks one from the list. */
  onSelect: (name: string) => void;
}

/**
 * "Người nhận" search + autocomplete field — Figma node B (mms_B_Chọn người nhận,
 * mms_B.2_Search). Backed by a static mock Sunner list (per clarification #2, no
 * backend); typing filters the list, selecting an entry commits the recipient.
 */
export default function KudosRecipientSelect({
  value,
  onSelect,
}: KudosRecipientSelectProps) {
  const { t } = useTranslation();
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Keep the draft input text in sync whenever the committed value changes
  // externally (e.g. form reset on modal close). Adjusted during render with a
  // prev-value guard — the react.dev-recommended alternative to a sync effect.
  const [prevValue, setPrevValue] = useState(value);
  if (prevValue !== value) {
    setPrevValue(value);
    setQuery(value);
  }

  // Clicking outside closes the dropdown and restores the committed value.
  useClickOutside(
    rootRef,
    () => {
      setOpen(false);
      setQuery(value);
    },
    open
  );

  const filtered = MOCK_SUNNERS.filter((sunner) =>
    sunner.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div ref={rootRef} className="relative flex-1">
      <div className="flex h-14 w-full items-center gap-4 rounded-lg border border-[#998C5F] bg-white px-6">
        <input
          type="text"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          placeholder={t("kudos:recipient.placeholder")}
          className="flex-1 bg-transparent text-base font-bold text-[#00101A] outline-none placeholder:font-bold placeholder:text-[#999999]"
        />
        <button
          type="button"
          aria-label={t("kudos:recipient.label")}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className={`shrink-0 text-[#00101A] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </button>
      </div>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-[calc(100%+8px)] z-10 max-h-56 w-full overflow-y-auto rounded-lg border border-[#998C5F] bg-white py-2 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-6 py-2 text-sm font-bold text-[#999999]">
              {t("kudos:recipient.empty")}
            </li>
          ) : (
            filtered.map((sunner) => (
              <li key={sunner.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={sunner.name === value}
                  onClick={() => {
                    onSelect(sunner.name);
                    setQuery(sunner.name);
                    setOpen(false);
                  }}
                  className="w-full px-6 py-2 text-left text-sm font-bold text-[#00101A] hover:bg-[#FFEA9E]/30"
                >
                  {sunner.name}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
