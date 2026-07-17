/**
 * Mock data for the HIGHLIGHT KUDOS carousel — Figma "B_Highlight" (2940:13451).
 *
 * The design only authors ONE populated "KUDO - Highlight" card (component
 * 335:9620, instance 2940:13465 / B.3): every other visible instance in the
 * canvas (2940:13464, 2940:13466 — the faded side cards) repeats the exact
 * same sender/receiver/time/message/hashtags/like-count. The pagination
 * indicator ("B.5.2_số trang") reads "2/5", so the carousel needs 5 slides.
 * Per the no-invented-data rule, the 5 mock entries below all reuse that one
 * authored card's content verbatim (only the `id` differs, for React keys /
 * pagination) rather than fabricating 5 distinct people or messages.
 */

import type { HeroBadgeType } from "@/components/common/hero-badge";

export interface HighlightPerson {
  name: string;
  department: string;
  /** Hero-tier badge shown next to the department code (shared `HeroBadge`). */
  badge: HeroBadgeType;
  badgeLabel: string;
  avatarSrc: string;
}

export interface HighlightKudo {
  id: string;
  sender: HighlightPerson;
  receiver: HighlightPerson;
  /** "HH:mm - MM/DD/YYYY", verbatim per spec B.4.1. */
  postedAt: string;
  title: string;
  message: string;
  /** Up to 5 shown in one row; `hashtagsOverflow` mirrors the design's trailing "...". */
  hashtags: string[];
  hashtagsOverflow: boolean;
  likes: number;
}

const SENDER: HighlightPerson = {
  name: "Huỳnh Dương Xuân Nhật",
  department: "CECV1",
  badge: "rising",
  badgeLabel: "Rising Hero",
  avatarSrc: "/kudos/highlight/avatar-1.png",
};

const RECEIVER: HighlightPerson = {
  name: "Huỳnh Dương Xuân Nhật",
  department: "CECV1",
  badge: "legend",
  badgeLabel: "Legend Hero",
  avatarSrc: "/kudos/highlight/avatar-2.png",
};

const BASE_CARD: Omit<HighlightKudo, "id"> = {
  sender: SENDER,
  receiver: RECEIVER,
  postedAt: "10:00 - 10/30/2025",
  title: "IDOL GIỚI TRẺ",
  message:
    "Cảm ơn người em bình thường nhưng phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất...",
  hashtags: ["Dedicated", "Inspring", "Dedicated", "Inspring", "Dedicated"],
  hashtagsOverflow: true,
  likes: 1000,
};

export const highlightKudos: HighlightKudo[] = Array.from(
  { length: 5 },
  (_, i) => ({ ...BASE_CARD, id: `highlight-${i + 1}` }),
);

/** Filter option lists — extracted from the card content above (design has no distinct dropdown-panel data for this screen). */
export const highlightHashtagOptions: string[] = Array.from(
  new Set(BASE_CARD.hashtags),
);
export const highlightDepartmentOptions: string[] = Array.from(
  new Set([SENDER.department, RECEIVER.department]),
);
