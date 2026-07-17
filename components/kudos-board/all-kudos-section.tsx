"use client";

import { useCopyLinkToast } from "@/components/kudos-board/use-copy-link-toast";
import FeedHeader from "@/components/kudos-board/feed-header";
import FeedList from "@/components/kudos-board/feed-list";
import SidebarPanel from "@/components/kudos-board/sidebar-panel";

/**
 * `C_All kudos` (node 2940:13475) — section header + two-column layout: the
 * `C.2_Danh sách lời cảm ơn` feed on the left and `D_Thống menu phải` sidebar
 * on the right (node 2940:13481, gap:80px between the two columns).
 * Presentational + client-interactive, no backend — see feed-mock-data.ts
 * for the design-sourced mock content.
 */
export default function AllKudosSection() {
  const { copyLink, toast } = useCopyLinkToast();

  return (
    // mm:2940:13475
    <section className="flex w-full flex-col items-center gap-10" aria-label="All Kudos">
      <FeedHeader />

      {/* mm:2940:13481 Frame 502 */}
      <div className="mx-auto flex w-full max-w-[1224px] items-start gap-20 px-6">
        <div className="min-w-0 flex-1">
          <FeedList onCopyLink={copyLink} />
        </div>
        <SidebarPanel />
      </div>

      {toast}
    </section>
  );
}
