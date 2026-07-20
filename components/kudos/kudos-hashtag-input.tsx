"use client";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "@/hooks/use-click-outside";
import CustomSvgIcon from "@/components/common/custom-svg-icon";
import { KUDOS_MAX_HASHTAGS, SAA_HASHTAGS, saaHashtagLabel } from "@/constants";

export interface KudosHashtagInputProps {
  /** Selected hashtag ids (`SaaHashtag.value`). */
  tags: number[];
  onChange: (tags: number[]) => void;
}

const LISTBOX_ID = "kudos-hashtag-listbox";

/**
 * "Hashtag" field — MoMorph "Dropdown list hashtag" (screen p9zO-c4a4x, node
 * 1002:13013). The "+ Hashtag / Tối đa 5" button opens a fixed multi-select
 * dropdown of the canonical `SAA_HASHTAGS`: each row toggles selection, a
 * check-in-circle marks selected rows, hover highlights, and once 5 are chosen
 * the unselected rows are disabled (spec A.1/D). Selected tags also render as
 * removable chips so the current choice stays visible when the dropdown closes.
 */
export default function KudosHashtagInput({
  tags,
  onChange,
}: KudosHashtagInputProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Clicking outside closes the hashtag dropdown.
  useClickOutside(rootRef, () => setOpen(false), open);

  const atMax = tags.length >= KUDOS_MAX_HASHTAGS;

  const toggleTag = (value: number) => {
    if (tags.includes(value)) {
      onChange(tags.filter((v) => v !== value));
    } else if (!atMax) {
      onChange([...tags, value]);
    }
  };

  const removeTag = (value: number) =>
    onChange(tags.filter((v) => v !== value));

  return (
    <div ref={rootRef} className="relative flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-2 rounded-lg border border-[#998C5F] bg-white px-3 py-2 text-sm font-bold text-[#00101A]"
        >
          #{saaHashtagLabel(tag)}
          <button
            type="button"
            aria-label={t("kudos:hashtag.remove", {
              tag: saaHashtagLabel(tag),
            })}
            onClick={() => removeTag(tag)}
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D4271D] text-[10px] leading-none text-white"
          >
            ✕
          </button>
        </span>
      ))}

      {!atMax && (
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={LISTBOX_ID}
          onClick={() => setOpen((prev) => !prev)}
          className="flex flex-col items-center gap-0.5 rounded-lg border border-[#998C5F] bg-white px-3 py-1.5"
        >
          {/* "+ Hashtag" bold navy + small gray "Tối đa 5" — Figma mms_E button */}
          <span className="flex items-center gap-1 text-base font-bold leading-6 text-[#00101A]">
            <span aria-hidden>+</span>
            {t("kudos:hashtag.add")}
          </span>
          <span className="text-xs font-bold text-[#999999]">
            {t("kudos:hashtag.max")}
          </span>
        </button>
      )}

      {open && (
        // mm:1002:13013 — dark dropdown of selectable hashtag rows.
        <ul
          id={LISTBOX_ID}
          role="listbox"
          aria-multiselectable
          aria-label={t("kudos:hashtag.label")}
          className="absolute left-0 top-[calc(100%+8px)] z-10 flex max-h-72 w-72 flex-col overflow-y-auto rounded-2xl bg-[#1B1C13] p-2 shadow-lg"
        >
          {SAA_HASHTAGS.map((h) => {
            const selected = tags.includes(h.value);
            const disabled = !selected && atMax;
            return (
              <li key={h.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  disabled={disabled}
                  onClick={() => toggleTag(h.value)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-base font-bold text-white transition-colors ${
                    selected ? "bg-white/10" : "hover:bg-white/5"
                  } ${disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
                >
                  <span>#{h.label}</span>
                  {selected && (
                    <CustomSvgIcon
                      src="/kudos/icons/check-circle.svg"
                      className="h-6 w-6"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
