"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import CustomSvgIcon from "@/components/common/custom-svg-icon";

interface SidebarGiftDialogProps {
  /** Number of not-yet-opened secret boxes (from the sidebar stats). */
  unopenedCount: number;
  onClose: () => void;
}

/**
 * "Open secret box — chưa mở" modal (MoMorph frame 6418 / screen J3-4YFIpMM):
 * the not-yet-opened state. Header (title + close) → divider → instruction →
 * gift-box illustration → divider → unopened-count footer. Per spec, when
 * `unopenedCount === 0` the instruction line is hidden and the box is
 * non-interactive. The open/reveal flow (random badge) lives in separate frames
 * and is out of scope here.
 */
export default function SidebarGiftDialog({
  unopenedCount,
  onClose,
}: SidebarGiftDialogProps) {
  const { t } = useTranslation();
  const hasBoxes = unopenedCount > 0;

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock background scroll while the modal is open (mirrors KudosFormModal /
  // SaaRulesDrawer). Restores the prior value on close so nested overlays don't
  // clobber each other.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const overlay = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="gift-dialog-title"
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 p-6"
      onClick={onClose}
    >
      {/* mm:1466:7676 — modal shell (bg #00101A, r=12.7px, gap 22px) */}
      <div
        className="my-auto flex h-[823px] max-h-full w-[652px] max-w-full shrink-0 flex-col items-center gap-[22px] overflow-hidden rounded-[13px] border border-[#998C5F] bg-[#00101A] px-[13px] py-6 font-(family-name:--font-montserrat)"
        onClick={(event) => event.stopPropagation()}
      >
        {/* mm:1466:7677 Frame 551 — title + close */}
        <div className="relative flex w-full items-center justify-center">
          <h3
            id="gift-dialog-title"
            className="text-center text-[26px] leading-8 font-bold text-[#FFEA9E]"
          >
            {t("kudosFeed:giftDialog.title")}
          </h3>
          {/* mm:1466:7679 MM_MEDIA_Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label={t("kudosFeed:giftDialog.closeAria")}
            className="absolute right-0 text-white transition-colors hover:text-[#FFEA9E]"
          >
            <CustomSvgIcon
              src="/kudos/secret-box/close.svg"
              className="h-5 w-5"
            />
          </button>
        </div>

        {/* mm:1466:7680 Rectangle 16 */}
        <div className="h-px w-full bg-[#2E3940]" />

        {/* mm:1466:7681 B_Group 396 — instruction (hidden when no boxes) */}
        {hasBoxes && (
          <p className="text-center text-[13px] leading-5 font-bold tracking-[0.4px] text-white">
            {t("kudosFeed:giftDialog.subtitle")}
          </p>
        )}

        {/* mm:1466:7684 C_Box image — box render (7686) + sparkle overlay (7685) */}
        <div
          role="img"
          aria-label={t("kudosFeed:giftDialog.boxAlt")}
          className={`relative aspect-square w-full max-w-[557px] ${
            hasBoxes ? "cursor-pointer" : "pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/kudos/secret-box/box-closed.svg)" }}
          />
        </div>

        {/* mm:1466:7688 Rectangle 18 */}
        <div className="h-px w-full bg-[#2E3940]" />

        {/* mm:1466:7689 D_Số box chưa mở — label + zero-padded count */}
        <div className="flex items-center gap-2">
          <span className="text-[13px] leading-5 font-bold tracking-[0.4px] text-white">
            {t("kudosFeed:giftDialog.footerLabel")}
          </span>
          <span className="text-[29px] leading-9 font-bold text-[#FFEA9E]">
            {String(unopenedCount).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );

  // Portal to <body> so the overlay escapes the sidebar's stacking/overflow
  // context. `document` is undefined during SSR, but this modal is only ever
  // rendered after a client click, so the guard just protects the type.
  return typeof document === "undefined"
    ? null
    : createPortal(overlay, document.body);
}
