"use client";

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "@/hooks/use-click-outside";
import { MOCK_HASHTAGS } from "./kudos-mock-data";

export interface KudosHashtagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const MAX_TAGS = 5;

/**
 * "Hashtag" field — Figma node E (mms_E_Frame 536, mms_E.2_Tag Group). The
 * "+ Hashtag" button opens a dropdown of sample hashtags (mock data, per
 * clarification #2) and also lets the user type a custom tag. Chips are
 * removable; the field is capped at 5 tags per the design's "Tối đa 5" note.
 */
export default function KudosHashtagInput({
  tags,
  onChange,
}: KudosHashtagInputProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [customTag, setCustomTag] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  // Clicking outside closes the hashtag dropdown.
  useClickOutside(rootRef, () => setOpen(false), open);

  const canAddMore = tags.length < MAX_TAGS;

  const addTag = (tag: string) => {
    const clean = tag.trim().replace(/^#/, "");
    if (!clean || tags.includes(clean) || tags.length >= MAX_TAGS) return;
    onChange([...tags, clean]);
    setCustomTag("");
  };

  const removeTag = (tag: string) => onChange(tags.filter((t2) => t2 !== tag));

  return (
    <div ref={rootRef} className="relative flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-2 rounded-lg border border-[#998C5F] bg-white px-3 py-2 text-sm font-bold text-[#00101A]"
        >
          #{tag}
          <button
            type="button"
            aria-label={`remove ${tag}`}
            onClick={() => removeTag(tag)}
            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#D4271D] text-[10px] leading-none text-white"
          >
            ✕
          </button>
        </span>
      ))}

      {canAddMore && (
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
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
        <div className="absolute left-0 top-[calc(100%+8px)] z-10 w-64 rounded-lg border border-[#998C5F] bg-white p-3 shadow-lg">
          <ul className="mb-2 flex max-h-40 flex-col gap-1 overflow-y-auto">
            {MOCK_HASHTAGS.filter((h) => !tags.includes(h)).map((h) => (
              <li key={h}>
                <button
                  type="button"
                  onClick={() => addTag(h)}
                  className="w-full rounded px-2 py-1 text-left text-sm font-bold text-[#00101A] hover:bg-[#FFEA9E]/30"
                >
                  #{h}
                </button>
              </li>
            ))}
          </ul>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              addTag(customTag);
            }}
            className="flex gap-2"
          >
            <input
              value={customTag}
              onChange={(event) => setCustomTag(event.target.value)}
              placeholder={t("kudos:hashtag.customPlaceholder")}
              className="flex-1 rounded border border-[#998C5F] px-2 py-1 text-sm font-bold text-[#00101A] outline-none placeholder:font-normal placeholder:text-[#999999]"
            />
            <button
              type="submit"
              disabled={!customTag.trim()}
              className="rounded bg-[#FFEA9E] px-3 py-1 text-sm font-bold text-[#00101A] disabled:cursor-not-allowed disabled:opacity-50"
            >
              +
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
