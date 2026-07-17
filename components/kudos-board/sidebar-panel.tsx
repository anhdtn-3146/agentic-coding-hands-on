"use client";

import { useTranslation } from "react-i18next";
import {
  GIFT_LEADERBOARD,
  RISING_LEADERBOARD,
} from "@/components/kudos-board/feed-mock-data";
import SidebarStats from "@/components/kudos-board/sidebar-stats";
import SidebarLeaderboard from "@/components/kudos-board/sidebar-leaderboard";

/**
 * `D_Thống menu phải` (node 2940:13488) — the right sidebar column: stats box
 * + the two leaderboards. Sticky so it stays visible while the (much taller)
 * feed column scrolls, matching the common "sidebar shorter than main
 * content" layout seen in the design.
 */
export default function SidebarPanel() {
  const { t } = useTranslation();

  return (
    <aside className="flex w-[422px] shrink-0 flex-col items-start gap-6">
      <SidebarStats />
      <SidebarLeaderboard
        title={t("kudosFeed:leaderboard.risingTitle")}
        entries={RISING_LEADERBOARD}
        emptyLabel={t("kudosFeed:leaderboard.empty")}
      />
      <SidebarLeaderboard
        title={t("kudosFeed:leaderboard.giftTitle")}
        entries={GIFT_LEADERBOARD}
        emptyLabel={t("kudosFeed:leaderboard.empty")}
      />
    </aside>
  );
}
