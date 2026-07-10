"use client";

import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export interface KudosImagePreview {
  file: File;
  url: string;
}

export interface KudosImageUploadProps {
  images: KudosImagePreview[];
  onChange: (images: KudosImagePreview[]) => void;
}

const MAX_IMAGES = 5;

/**
 * "Image" attachment field — Figma node F (mms_F_Frame 537). Real file picker
 * (per clarification #4): selected files get a local `URL.createObjectURL`
 * preview with a remove button; capped at 5, add button hides once full.
 * Object URLs are revoked on remove/unmount to avoid leaking blob memory.
 */
export default function KudosImageUpload({
  images,
  onChange,
}: KudosImageUploadProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  // Keep the latest images in a ref so the unmount cleanup effect (which must
  // run with an empty dep array) can still revoke whatever is current then.
  const imagesRef = useRef(images);
  imagesRef.current = images;

  useEffect(() => {
    return () => {
      imagesRef.current.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const room = MAX_IMAGES - images.length;
    const picked = Array.from(files).slice(0, room);
    const next = picked.map((file) => ({ file, url: URL.createObjectURL(file) }));
    onChange([...images, ...next]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeAt = (index: number) => {
    const target = images[index];
    URL.revokeObjectURL(target.url);
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {images.map((img, i) => (
        <div
          key={img.url}
          className="relative h-20 w-20 shrink-0 rounded-[18px] border border-[#998C5F] bg-white"
        >
          {/* Rounding lives on the img (not overflow-hidden on the wrapper) so
              the absolutely-positioned ✕ badge can overlap the corner uncut. */}
          {/* Local blob preview — next/image cannot optimize object URLs. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.url}
            alt=""
            className="h-full w-full rounded-[17px] object-cover"
          />
          <button
            type="button"
            aria-label={`remove image ${i + 1}`}
            onClick={() => removeAt(i)}
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#D4271D] text-[10px] text-white"
          >
            ✕
          </button>
        </div>
      ))}

      {images.length < MAX_IMAGES && (
        <label className="flex w-fit cursor-pointer flex-col items-center gap-0.5 rounded-lg border border-[#998C5F] bg-white px-3 py-1.5">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => handleFiles(event.target.files)}
          />
          {/* "+ Image" bold navy + small gray "Tối đa 5" — Figma mms_F.5 button */}
          <span className="flex items-center gap-1 text-base font-bold leading-6 text-[#00101A]">
            <span aria-hidden>+</span>
            {t("kudos:image.add")}
          </span>
          <span className="text-xs font-bold text-[#999999]">
            {t("kudos:image.max")}
          </span>
        </label>
      )}
    </div>
  );
}
