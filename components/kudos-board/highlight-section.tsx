"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import HighlightFilterDropdown from "./highlight-filter-dropdown";
import HighlightKudoCard from "./highlight-kudo-card";
import { highlightKudos } from "./highlight-mock-data";
import { NavArrowButton } from "./highlight-nav-arrow";
import { useCopyLinkToast } from "./use-copy-link-toast";
import { DEPARTMENTS, SAA_HASHTAGS } from "@/constants";

/**
 * HIGHLIGHT KUDOS carousel — Figma "B_Highlight" (2940:13451): header +
 * Hashtag/Phòng ban filters (B.1) + 5-slide carousel (B.2/B.3) + pagination
 * bar (B.5). See `highlight-mock-data.ts` for why all 5 slides share content.
 */
export default function HighlightSection() {
  const { t } = useTranslation();
  const { copyLink, toast } = useCopyLinkToast();
  const [hashtag, setHashtag] = useState<number | null>(null);
  const [department, setDepartment] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  // Liked kudos tracked by id (not slot position) so the like state follows the
  // kudo as the carousel navigates. Keyed here rather than in the card because
  // prev/current/next cards are reused across slides.
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = highlightKudos.filter((k) => {
    const hashtagMatched = hashtag === null || k.hashtags.includes(hashtag);

    const departmentMatched =
      department === null ||
      k.sender.department === department ||
      k.receiver.department === department;

    return hashtagMatched && departmentMatched;
  });

  // Changing a filter invalidates the current slide position — jump back to
  // slide 1. Reset happens in the same event as the selection change itself
  // (not a useEffect) to avoid a cascading extra render.
  const handleSelectHashtag = (value: number | null) => {
    setHashtag(value);
    setIndex(0);
  };
  const handleSelectDepartment = (value: number | null) => {
    setDepartment(value);
    setIndex(0);
  };

  const total = filtered.length;
  const atFirst = index <= 0;
  const atLast = total === 0 || index >= total - 1;
  const current = total > 0 ? filtered[index] : null;
  const prev = index > 0 ? filtered[index - 1] : null;
  const next = index < total - 1 ? filtered[index + 1] : null;

  return (
    // mm:2940:13451
    <section className="flex w-full flex-col gap-10">
      {/* mm:2940:13452 B.1_header */}
      <div className="mx-auto w-full max-w-[1152px] px-6 lg:px-0">
        <div className="flex flex-col items-start gap-4">
          {/* mm:2940:13454 */}
          <p className="font-(family-name:--font-montserrat) text-2xl leading-8 font-bold text-white">
            {t("kudosBoard:highlight.eyebrow")}
          </p>
          {/* mm:2940:13455 Rectangle 26 */}
          <div className="h-px w-full bg-[#2E3940]" />
          {/* mm:2940:13456 Frame 488 */}
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            {/* mm:2940:13457 */}
            <h2 className="font-(family-name:--font-montserrat) text-4xl leading-[1.1] font-bold tracking-[-0.25px] text-[#FFEA9E] lg:text-[57px] lg:leading-[64px]">
              {t("kudosBoard:highlight.title")}
            </h2>
            {/* mm:2940:13458 Buttons */}
            <div className="flex items-center gap-2">
              <HighlightFilterDropdown
                label={t("kudosBoard:highlight.filters.hashtag")}
                options={SAA_HASHTAGS.map((item) => ({
                  ...item,
                  label: `#${item.label}`,
                }))}
                selected={hashtag}
                onSelect={handleSelectHashtag}
              />
              <HighlightFilterDropdown
                label={t("kudosBoard:highlight.filters.department")}
                options={DEPARTMENTS}
                selected={department}
                onSelect={handleSelectDepartment}
              />
            </div>
          </div>
        </div>
      </div>

      {total === 0 || !current ? (
        <p className="mx-auto w-full max-w-[1152px] px-6 py-16 text-center text-lg font-bold text-[#999999] lg:px-0">
          {t("kudosBoard:highlight.empty")}
        </p>
      ) : (
        <>
          {/* mm:2940:13461 B.2_HIGHLIGHT KUDOS */}
          <div className="relative flex w-full items-center justify-center gap-6 overflow-hidden py-4">
            {/* mm:2940:13469 Frame 528 — left fade + big prev arrow */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-1/3 max-w-[400px] items-center justify-start pl-8"
              style={{
                background:
                  "linear-gradient(90deg, #00101A 50%, rgba(255,255,255,0) 100%)",
              }}
            >
              <span className="pointer-events-auto">
                {/* mm:2940:13470 B.2.1_Button lùi */}
                <NavArrowButton
                  direction="left"
                  size="large"
                  disabled={atFirst}
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  label={t("kudosBoard:highlight.pagination.prev")}
                />
              </span>
            </div>

            {prev && (
              <HighlightKudoCard
                key={prev.id}
                kudo={prev}
                interactive={false}
                liked={likedIds.has(prev.id)}
                onToggleLike={() => toggleLike(prev.id)}
                onCopyLink={copyLink}
              />
            )}
            <HighlightKudoCard
              key={current.id}
              kudo={current}
              interactive
              liked={likedIds.has(current.id)}
              onToggleLike={() => toggleLike(current.id)}
              onCopyLink={copyLink}
            />
            {next && (
              <HighlightKudoCard
                key={next.id}
                kudo={next}
                interactive={false}
                liked={likedIds.has(next.id)}
                onToggleLike={() => toggleLike(next.id)}
                onCopyLink={copyLink}
              />
            )}

            {/* mm:2940:13467 Frame 527 — right fade + big next arrow */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-1/3 max-w-[400px] items-center justify-end pr-8"
              style={{
                background:
                  "linear-gradient(270deg, #00101A 50%, rgba(255,255,255,0) 100%)",
              }}
            >
              <span className="pointer-events-auto">
                {/* mm:2940:13468 B.2.2_Button tiến */}
                <NavArrowButton
                  direction="right"
                  size="large"
                  disabled={atLast}
                  onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
                  label={t("kudosBoard:highlight.pagination.next")}
                />
              </span>
            </div>
          </div>

          {/* mm:2940:13471 B.5_slide */}
          <div className="flex w-full items-center justify-center gap-8">
            {/* mm:2940:13472 B.5.1_Button lùi */}
            <NavArrowButton
              direction="left"
              disabled={atFirst}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              label={t("kudosBoard:highlight.pagination.prev")}
            />
            {/* mm:2940:13473 B.5.2_số trang */}
            <p className="font-(family-name:--font-montserrat) text-[28px] leading-9 font-bold text-[#999999]">
              <span className="text-[#FFEA9E]">{index + 1}</span>/{total}
            </p>
            {/* mm:2940:13474 B.5.3_Button tiến */}
            <NavArrowButton
              direction="right"
              disabled={atLast}
              onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
              label={t("kudosBoard:highlight.pagination.next")}
            />
          </div>
        </>
      )}

      {toast}
    </section>
  );
}
