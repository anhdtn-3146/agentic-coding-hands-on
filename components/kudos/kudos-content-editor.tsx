"use client";

import { useTranslation } from "react-i18next";

export interface KudosContentEditorProps {
  value: string;
  onChange: (value: string) => void;
}

/** Toolbar buttons — Figma nodes C.1-C.6 (mms_C.1_bold .. mms_C.6_quote). */
const TOOLBAR_ICONS = [
  { key: "bold", label: "B", className: "font-bold" },
  { key: "italic", label: "I", className: "font-bold italic" },
  { key: "strike", label: "S", className: "font-bold line-through" },
  { key: "list", label: "≡", className: "font-bold" },
  // grayscale filter renders the emoji monochrome, matching the Figma icon set
  { key: "link", label: "🔗", className: "grayscale" },
  { key: "quote", label: "❞", className: "text-xl font-bold" },
] as const;

/**
 * Kudo content editor — Figma nodes C/D (mms_C_Chức năng, mms_D_text filed).
 * Per clarification #3, the toolbar is presentational/no-op (no WYSIWYG lib);
 * the actual content lives in a plain <textarea>. The "Tiêu chuẩn cộng đồng"
 * link is a no-op placeholder.
 */
export default function KudosContentEditor({
  value,
  onChange,
}: KudosContentEditorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col overflow-hidden rounded-lg border border-[#998C5F]">
        {/* Toolbar row sits on the modal's cream bg (only the textarea is white);
            every icon cell gets a right separator, incl. the last one before the
            "Tiêu chuẩn cộng đồng" zone — per the Figma render. */}
        <div className="flex items-center justify-between border-b border-[#998C5F]">
          <div className="flex items-center">
            {TOOLBAR_ICONS.map(({ key, label, className }) => (
              <button
                key={key}
                type="button"
                aria-label={t(`kudos:toolbar.${key}`)}
                className={`flex h-9 items-center justify-center border-r border-[#998C5F] px-4 text-[#00101A] hover:bg-[#FFEA9E]/20 ${className}`}
              >
                {label}
              </button>
            ))}
          </div>
          <a
            href="#"
            onClick={(event) => event.preventDefault()}
            className="mx-auto whitespace-nowrap px-4 text-base font-bold text-[#E46060] underline"
          >
            {t("kudos:editor.communityStandard")}
          </a>
        </div>
        {/* mms_D_text filed — fixed 200px white box, radius 0 0 8 8 via wrapper */}
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={t("kudos:editor.placeholder")}
          className="h-50 w-full resize-none bg-white px-6 py-3 text-base font-bold text-[#00101A] outline-none placeholder:font-bold placeholder:text-[#999999]"
        />
      </div>
      {/* mms_D.1_Gợi ý — 16px bold navy, centered under the editor */}
      <p className="mt-1 text-center text-base font-bold tracking-[0.5px] text-[#00101A]">
        {t("kudos:editor.hint")}
      </p>
    </div>
  );
}
