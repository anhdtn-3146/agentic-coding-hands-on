"use client";

import { useTranslation } from "react-i18next";
import CustomSvgIcon from "@/components/common/custom-svg-icon";
import HeroBadge from "@/components/common/hero-badge";
import type { HighlightKudo, HighlightPerson } from "./highlight-mock-data";
import { departmentLabel, saaHashtagLabel } from "@/constants";

export interface HighlightKudoCardProps {
  kudo: HighlightKudo;
  /** Center slide is prominent + interactive; side slides are faded/read-only per spec. */
  interactive: boolean;
  /** Liked state is lifted to the carousel and keyed by `kudo.id` so it tracks
   *  the kudo, not the reused slot position (prev/current/next). */
  liked: boolean;
  onToggleLike: () => void;
  onCopyLink: (url: string) => void;
}

/** Sender/receiver block — Figma "Infor" instance (256:4830). */
function PersonInfo({ person }: { person: HighlightPerson }) {
  return (
    <div className="flex w-[235px] shrink-0 flex-col items-center gap-[13px]">
      {/* mm:I2940:13465;335:9443;256:4734 MM_MEDIA_Avatar — profile pages
          don't exist yet, so avatar/name are non-interactive spans (matches
          PersonBlock in feed-kudo-post-card.tsx; avoids dead tab stops). */}
      <span
        role="img"
        className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-[1.869px] border-white bg-[#EEE] bg-cover bg-center"
        style={{ backgroundImage: `url(${person.avatarSrc})` }}
        aria-label={person.name}
      />
      <div className="flex flex-col items-center gap-0.5">
        {/* mm:I2940:13465;335:9443;256:4735 */}
        <span className="font-(family-name:--font-montserrat) w-[235px] cursor-default text-center text-base leading-6 font-bold tracking-[0.15px] text-[#00101A]">
          {person.name}
        </span>
        {/* mm:I2940:13465;335:9443;256:4741 Huy hiệu + Sao */}
        <div className="flex items-center justify-center gap-2.5">
          <span className="font-(family-name:--font-montserrat) text-sm leading-5 font-bold tracking-[0.1px] text-[#999999]">
            {departmentLabel(person.department)}
          </span>
          <span
            aria-hidden
            className="h-1 w-1 rounded-full bg-[#999999] opacity-40"
          />
          {/* mm:I2940:13465;335:9443;3106:17694 danh hiệu badge */}
          <HeroBadge type={person.badge} label={person.badgeLabel} />
        </div>
      </div>
    </div>
  );
}

export default function HighlightKudoCard({
  kudo,
  interactive,
  liked,
  onToggleLike,
  onCopyLink,
}: HighlightKudoCardProps) {
  const { t } = useTranslation();
  // Count is derived from `liked` (single source of truth) — keeping it as a
  // second state can drift from the flag under batched rapid clicks.
  const likes = kudo.likes + (liked ? 1 : 0);

  const hashtagLine =
    kudo.hashtags.map((h) => `#${saaHashtagLabel(h)}`).join(" ") +
    (kudo.hashtagsOverflow ? "..." : "");

  return (
    // mm:2940:13465 B.3_KUDO - Highlight
    <div
      className={`flex w-[528px] max-w-[85vw] shrink-0 flex-col items-start gap-4 rounded-2xl border-4 border-[#FFEA9E] bg-[#FFF8E1] px-6 pt-6 pb-4 transition-all duration-300 ${
        interactive ? "opacity-100" : "pointer-events-none opacity-40"
      }`}
    >
      {/* mm:I2940:13465;335:9442 Frame 482 — two 235px person blocks fill the
          480px inner width (justify-between); the arrow overlaps the centered
          gap between them, matching the design's absolute layout. The blocks
          must not flex-shrink or the receiver overflows the card. */}
      <div className="relative flex w-full items-start justify-between">
        <PersonInfo person={kudo.sender} />
        {/* mm:I2940:13465;335:9444 B.3.4_Icon mũi tên */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center py-4 text-[#00101A]">
          <CustomSvgIcon src="/kudos/icons/send.svg" className="h-8 w-8" />
        </div>
        <PersonInfo person={kudo.receiver} />
      </div>

      {/* mm:I2940:13465;335:9447 Rectangle 14 */}
      <div className="h-px w-full bg-[#FFEA9E]" />

      {/* mm:I2940:13465;335:9448 B.4_Nội dung lời cảm ơn */}
      <div className="flex w-full flex-col items-end gap-4">
        {/* mm:I2940:13465;335:9449 B.4.1_Thời gian đăng */}
        <p className="font-(family-name:--font-montserrat) w-full text-base leading-6 font-bold tracking-[0.5px] text-[#999999]">
          {kudo.postedAt}
        </p>
        {/* mm:I2940:13465;1810:19718 */}
        <p className="font-(family-name:--font-montserrat) w-full text-center text-base leading-6 font-bold tracking-[0.5px] text-[#00101A]">
          {kudo.title}
        </p>
        {/* mm:I2940:13465;335:9450 B.4.2_Nội dung */}
        <div className="w-full rounded-xl border border-[#FFEA9E] bg-[#FFEA9E]/40 px-6 py-4">
          {/* mm:I2940:13465;662:12223 */}
          <p className="font-(family-name:--font-montserrat) line-clamp-3 text-justify text-xl leading-8 font-bold text-[#00101A]">
            {kudo.message}
          </p>
        </div>
        {/* mm:I2940:13465;335:9458 B.4.3_Hashtag */}
        <p className="font-(family-name:--font-montserrat) w-full truncate text-base leading-6 font-bold tracking-[0.5px] text-[#D4271D]">
          {hashtagLine}
        </p>
      </div>

      {/* mm:I2940:13465;335:9460 Rectangle 15 */}
      <div className="h-px w-full bg-[#FFEA9E]" />

      {/* mm:I2940:13465;335:9461 B.4.4_Action */}
      <div className="flex w-full items-center justify-between gap-6">
        {/* mm:I2940:13465;335:9672 Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              interactive &&
              onCopyLink(
                typeof window !== "undefined"
                  ? `${window.location.origin}/sun-kudos#${kudo.id}`
                  : `/sun-kudos#${kudo.id}`,
              )
            }
            className="font-(family-name:--font-montserrat) flex cursor-pointer items-center gap-1 rounded px-4 py-4 text-base leading-6 font-bold tracking-[0.15px] text-[#00101A] hover:bg-[#00101A]/5"
          >
            {t("kudosBoard:highlight.card.copyLink")}
            <CustomSvgIcon src="/kudos/icons/link.svg" className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="font-(family-name:--font-montserrat) flex cursor-pointer items-center gap-1 rounded px-4 py-4 text-base leading-6 font-bold tracking-[0.15px] text-[#00101A] hover:bg-[#00101A]/5"
          >
            {t("kudosBoard:highlight.card.viewDetail")}
            <CustomSvgIcon src="/icons/icon_up.svg" className="h-6 w-6" />
          </button>
        </div>
        {/* mm:I2940:13465;335:9462 Hearts */}
        <button
          type="button"
          onClick={() => {
            if (!interactive) return;
            onToggleLike();
          }}
          className="flex cursor-pointer items-center gap-1"
          aria-pressed={liked}
          aria-label={t("kudosBoard:highlight.card.like")}
        >
          <span className="font-(family-name:--font-montserrat) text-2xl leading-8 font-bold text-[#00101A]">
            {likes.toLocaleString("vi-VN")}
          </span>
          <CustomSvgIcon
            src="/kudos/icons/heart.svg"
            className={
              liked ? "h-8 w-8 text-[#D4271D]" : "h-8 w-8 text-[#999999]"
            }
          />
        </button>
      </div>
    </div>
  );
}
