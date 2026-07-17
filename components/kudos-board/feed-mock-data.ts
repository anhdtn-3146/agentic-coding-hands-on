/**
 * Mock data for the All-Kudos feed + sidebar — every value below is copied
 * verbatim from the MoMorph "Sun* Kudos - Live board" design content
 * (fileKey 9ypp4enmFmdK3YAFJLIu6C, screen MaZUn5xHXZ, section C_All kudos /
 * D_Thống menu phải). No values were invented. The 4 sample "KUDO Post"
 * instances (C.3, C.5, C.6, C.7) share identical sender/receiver/message/
 * hashtag content in the design itself — only the sender's badge variant
 * differs (New Hero / Rising Hero / Super Hero / Super Hero) — so the mock
 * posts below preserve that duplication rather than inventing variety.
 */

import type { HeroBadgeType } from "@/components/common/hero-badge";

export type { HeroBadgeType };

export interface KudosPerson {
  name: string;
  dept: string;
  avatar: string;
  badge: HeroBadgeType;
  badgeLabel: string;
}

export interface KudoPost {
  id: string;
  sender: KudosPerson;
  receiver: KudosPerson;
  /** `C.3.4_Time` — literal design text, e.g. "10:00 - 10/30/2025". */
  time: string;
  /** `D.4_hashtag` category chip next to the pen icon, e.g. "IDOL GIỚI TRẺ". */
  category: string;
  /** `C.3.5_Content` message — the design copy already ends with "...". */
  message: string;
  /** `C.3.6_Image đính kèm` — up to 5 attachment thumbnails. */
  attachments: string[];
  /** `C.3.7_Hash tag` split into individual chips, e.g. ["Dedicated", "Inspring", ...]. */
  hashtags: string[];
  /** `C.4.1_Hearts` initial count — design shows "1.000" (vi-VN grouping) for every post. */
  likeCount: number;
}

const SENDER_AVATAR = "/kudos/feed/sender-avatar.png";
const RECEIVER_AVATAR = "/kudos/feed/receiver-avatar.png";
const ATTACHMENT_SAMPLE = "/kudos/feed/attachment-sample.png";

const MESSAGE =
  "Cảm ơn người em bình thường nhưng phi thường :D Cảm ơn sự chăm chỉ, cần mẫn của em đã tạo động lực rất nhiều cho team, để luôn nhắc mình luôn phải nỗ lực hơn nữa trong công việc. <3 và cuộc sống...";

// "#Dedicated #Inspring #Dedicated #Inspring #Dedicated  #Inspring..." (C.3.7) split into chips.
const HASHTAGS = ["Dedicated", "Inspring", "Dedicated", "Inspring", "Dedicated", "Inspring"];

const RECEIVER: KudosPerson = {
  name: "Huỳnh Dương Xuân",
  dept: "CEVC10",
  avatar: RECEIVER_AVATAR,
  badge: "legend",
  badgeLabel: "Legend Hero",
};

function sender(badge: HeroBadgeType, badgeLabel: string): KudosPerson {
  return {
    name: "Huỳnh Dương Xuân Nhật",
    dept: "CEVC10",
    avatar: SENDER_AVATAR,
    badge,
    badgeLabel,
  };
}

/** The 4 sample KUDO Post instances present in the design (C.3 / C.5 / C.6 / C.7). */
const BASE_POSTS: readonly KudoPost[] = [
  {
    id: "post-1",
    sender: sender("new", "New Hero"),
    receiver: RECEIVER,
    time: "10:00 - 10/30/2025",
    category: "IDOL GIỚI TRẺ",
    message: MESSAGE,
    attachments: Array(5).fill(ATTACHMENT_SAMPLE),
    hashtags: HASHTAGS,
    likeCount: 1000,
  },
  {
    id: "post-2",
    sender: sender("rising", "Rising Hero"),
    receiver: RECEIVER,
    time: "10:00 - 10/30/2025",
    category: "IDOL GIỚI TRẺ",
    message: MESSAGE,
    attachments: Array(5).fill(ATTACHMENT_SAMPLE),
    hashtags: HASHTAGS,
    likeCount: 1000,
  },
  {
    id: "post-3",
    sender: sender("super", "Super Hero"),
    receiver: RECEIVER,
    time: "10:00 - 10/30/2025",
    category: "IDOL GIỚI TRẺ",
    message: MESSAGE,
    attachments: Array(5).fill(ATTACHMENT_SAMPLE),
    hashtags: HASHTAGS,
    likeCount: 1000,
  },
  {
    id: "post-4",
    sender: sender("super", "Super Hero"),
    receiver: RECEIVER,
    time: "10:00 - 10/30/2025",
    category: "IDOL GIỚI TRẺ",
    message: MESSAGE,
    attachments: Array(5).fill(ATTACHMENT_SAMPLE),
    hashtags: HASHTAGS,
    likeCount: 1000,
  },
];

const PAGE_SIZE = BASE_POSTS.length;
/** How many times the 4 design posts repeat to simulate a longer, scrollable feed. */
const TOTAL_BATCHES = 3;

/** Full mock "database" — the 4 design posts repeated with unique ids per batch. */
export const ALL_KUDO_POSTS: readonly KudoPost[] = Array.from(
  { length: TOTAL_BATCHES },
  (_, batch) =>
    BASE_POSTS.map((post) => ({ ...post, id: `${post.id}-${batch}` })),
).flat();

export function getKudoPostsPage(page: number): KudoPost[] {
  const start = page * PAGE_SIZE;
  return ALL_KUDO_POSTS.slice(start, start + PAGE_SIZE);
}

export const KUDO_POSTS_PAGE_SIZE = PAGE_SIZE;
export const KUDO_POSTS_TOTAL_PAGES = TOTAL_BATCHES;

// ---- Sidebar (D) mock data ------------------------------------------------

export interface OverviewStats {
  kudosReceived: number;
  kudosSent: number;
  heartsReceived: number;
  heartsMultiplier: string;
  secretBoxOpened: number;
  secretBoxUnopened: number;
}

/** `D.1_Thống kê tổng quat` — all values read "25" in the design. */
export const OVERVIEW_STATS: OverviewStats = {
  kudosReceived: 25,
  kudosSent: 25,
  heartsReceived: 25,
  heartsMultiplier: "x2",
  secretBoxOpened: 25,
  secretBoxUnopened: 25,
};

export interface LeaderboardEntry {
  name: string;
  description: string;
  avatar: string;
}

const LEADERBOARD_AVATAR = "/kudos/feed/leaderboard-avatar.png";

/** `D.3_10 SUNNER nhận quà` — 5 entries visible in the design (title says "10", scrollable). */
export const GIFT_LEADERBOARD: readonly LeaderboardEntry[] = Array.from({ length: 5 }, () => ({
  name: "Huỳnh Dương Xuân",
  description: "Nhận được 1 áo phông SAA",
  avatar: LEADERBOARD_AVATAR,
}));

/**
 * "10 SUNNER CÓ SỰ THĂNG HẠNG MỚI NHẤT" has no corresponding box in this
 * frame of the design (only the gift leaderboard is present) — rendered with
 * the empty state per the task brief rather than invented entries.
 */
export const RISING_LEADERBOARD: readonly LeaderboardEntry[] = [];
