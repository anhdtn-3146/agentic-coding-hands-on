"use client";

import { useEffect, useMemo, useState } from "react";
import { Montserrat } from "next/font/google";
import { useTranslation } from "react-i18next";
import KudosRecipientSelect from "./kudos-recipient-select";
import KudosContentEditor from "./kudos-content-editor";
import KudosHashtagInput from "./kudos-hashtag-input";
import KudosImageUpload, { type KudosImagePreview } from "./kudos-image-upload";
import { KudoPost } from "../kudos-board/feed-mock-data";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
});

export interface KudosFormModalProps {
  open: boolean;
  onClose: () => void;
  initialValues?: KudoPost;
}

interface KudosFormState {
  recipient: string;
  danhHieu: string;
  content: string;
  hashtags: number[];
  images: KudosImagePreview[];
  anonymous: boolean;
}

const INITIAL_FORM: KudosFormState = {
  recipient: "",
  danhHieu: "",
  content: "",
  hashtags: [],
  images: [],
  anonymous: false,
};

/** Bold navy field label with a red required asterisk — Figma "Title" instances (416:5550). */
function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <span className="max-w-[139px] shrink-0 text-[22px] font-bold leading-7 text-[#00101A]">
      {children}
      {required && <span className="ml-0.5 text-[#CF1322]">*</span>}
    </span>
  );
}

/**
 * "Viết KUDOS" form modal — Figma "Viết Kudo" (fileKey 9ypp4enmFmdK3YAFJLIu6C,
 * screenId ihQ26W78P2, node 520:11602). Centered dialog over a dimmed backdrop,
 * mirrors the SaaRulesDrawer shell pattern (Esc-close, body-scroll-lock).
 *
 * Presentational + interactive per clarification #1: no backend call. "Gửi"
 * validates the required fields, shows a brief success message, then closes
 * and resets the draft.
 */
export default function KudosFormModal({
  open,
  onClose,
  initialValues,
}: KudosFormModalProps) {
  const { t } = useTranslation();
  const [form, setForm] = useState<KudosFormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  // Close = reset the draft (revoking pending image object URLs) + notify the
  // parent. Resetting here — in the event, not an effect — avoids the cascading
  // setState-in-effect render React warns about, and keeps updaters pure.
  const handleClose = () => {
    form.images.forEach((img) => URL.revokeObjectURL(img.url));
    setForm(INITIAL_FORM);
    setSubmitted(false);
    onClose();
  };

  const isValid = useMemo(
    () =>
      form.recipient.trim() !== "" &&
      form.danhHieu.trim() !== "" &&
      form.content.trim() !== "" &&
      form.hashtags.length > 0,
    [form.content, form.danhHieu, form.hashtags.length, form.recipient],
  );

  // Lock body scroll while the modal is open (mirrors SaaRulesDrawer). Kept
  // separate from the Esc listener so it only runs on open/close — re-running
  // per keystroke would clobber the saved overflow value.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Esc closes. No dep array: re-subscribing each render is a cheap listener
  // swap and keeps handleClose (recreated per render) always current.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (!open) return;

    if (!initialValues) {
      setForm(INITIAL_FORM);
      return;
    }

    setForm({
      recipient: initialValues.receiver.name,
      danhHieu: initialValues.category,
      content: initialValues.message,
      hashtags: initialValues.hashtags,
      images: initialValues.attachments.map((item) => ({
        url: item,
        file: undefined,
      })),
      anonymous: false,
    });
  }, [open, initialValues]);

  const handleSubmit = () => {
    if (!isValid) return;
    setSubmitted(true);
    window.setTimeout(() => handleClose(), 1200);
  };

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 ${
        open ? "" : "pointer-events-none"
      }`}
    >
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("kudos:title")}
        className={`${montserrat.className} relative flex max-h-[90vh] w-full max-w-[752px] flex-col gap-8 overflow-y-auto rounded-[24px] bg-[#FFF8E1] p-10 shadow-2xl transition-all duration-300 ${
          open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-2xl font-bold text-[#00101A]">
              ✓ {t("kudos:success")}
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-center text-[32px] font-bold leading-10 text-[#00101A]">
              {t("kudos:title")}
            </h2>

            <div className="flex items-center gap-4">
              <FieldLabel required>{t("kudos:recipient.label")}</FieldLabel>
              <KudosRecipientSelect
                value={form.recipient}
                onSelect={(name) => setForm((f) => ({ ...f, recipient: name }))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <FieldLabel required>{t("kudos:danhHieu.label")}</FieldLabel>
                <input
                  type="text"
                  value={form.danhHieu}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, danhHieu: e.target.value }))
                  }
                  placeholder={t("kudos:danhHieu.placeholder")}
                  className="h-14 flex-1 rounded-lg border border-[#998C5F] bg-white px-6 text-base font-bold text-[#00101A] outline-none placeholder:font-bold placeholder:text-[#999999]"
                />
              </div>
              {/* Helper lines align with the input column (label 139px + 16px gap) */}
              <p className="ml-38.75 text-base font-bold text-[#999999]">
                {t("kudos:danhHieu.example")}
                <br />
                {t("kudos:danhHieu.hint")}
              </p>
            </div>

            <KudosContentEditor
              value={form.content}
              onChange={(content) => setForm((f) => ({ ...f, content }))}
            />

            <div className="flex gap-4">
              <FieldLabel required>{t("kudos:hashtag.label")}</FieldLabel>
              <KudosHashtagInput
                tags={form.hashtags}
                onChange={(hashtags) => setForm((f) => ({ ...f, hashtags }))}
              />
            </div>

            <div className="flex gap-4">
              <FieldLabel>{t("kudos:image.label")}</FieldLabel>
              <KudosImageUpload
                images={form.images}
                onChange={(images) => setForm((f) => ({ ...f, images }))}
              />
            </div>

            {/* mms_G_Gửi ẩn danh — 22px bold gray label per Figma */}
            <label className="flex items-center gap-4 text-[22px] font-bold leading-7 text-[#999999]">
              <input
                type="checkbox"
                checked={form.anonymous}
                onChange={(e) =>
                  setForm((f) => ({ ...f, anonymous: e.target.checked }))
                }
                className="h-6 w-6 rounded border border-[#999999] accent-[#FFEA9E]"
              />
              {t("kudos:anonymous")}
            </label>

            <div className="flex items-stretch gap-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex items-center gap-2 rounded border border-[#998C5F] bg-[#FFEA9E]/10 px-10 py-4 text-lg font-bold text-[#00101A] hover:bg-[#FFEA9E]/20"
              >
                {t("kudos:cancel")}
                <span aria-hidden>✕</span>
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isValid}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#FFEA9E] px-4 py-4 text-lg font-bold text-[#00101A] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,234,158,0.45)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {t("kudos:submit")}
                <span aria-hidden>▷</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
