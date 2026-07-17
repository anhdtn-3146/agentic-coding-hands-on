"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getKudoPostsPage,
  KUDO_POSTS_TOTAL_PAGES,
  type KudoPost,
} from "@/components/kudos-board/feed-mock-data";
import KudoPostCard from "@/components/kudos-board/feed-kudo-post-card";

interface FeedListProps {
  onCopyLink: (url: string) => void;
}

/**
 * `C.2_Danh sách lời cảm ơn` — the vertical KUDO Post column. Simulates
 * infinite scroll over the mock post list (see feed-mock-data.ts) via an
 * IntersectionObserver sentinel, and supports client-side hashtag filtering.
 */
export default function FeedList({ onCopyLink }: FeedListProps) {
  const { t } = useTranslation();
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [selectedHashtag, setSelectedHashtag] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const posts = useMemo(() => {
    const loaded: KudoPost[] = [];
    for (let page = 0; page < pagesLoaded; page += 1) {
      loaded.push(...getKudoPostsPage(page));
    }
    if (!selectedHashtag) return loaded;
    return loaded.filter((post) =>
      post.hashtags.some((tag) => tag.toLowerCase() === selectedHashtag.toLowerCase()),
    );
  }, [pagesLoaded, selectedHashtag]);

  const hasMore = pagesLoaded < KUDO_POSTS_TOTAL_PAGES;

  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setPagesLoaded((count) => Math.min(count + 1, KUDO_POSTS_TOTAL_PAGES));
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore]);

  function handleHashtagClick(tag: string) {
    setSelectedHashtag((current) => (current?.toLowerCase() === tag.toLowerCase() ? null : tag));
  }

  return (
    <div className="flex w-full flex-col items-start gap-6">
      {selectedHashtag && (
        <button
          type="button"
          onClick={() => setSelectedHashtag(null)}
          className="rounded-full border border-[#FFEA9E] px-4 py-1 text-sm font-bold text-[#FFEA9E] hover:bg-[#FFEA9E]/10"
        >
          #{selectedHashtag} ×
        </button>
      )}

      {posts.length === 0 ? (
        <p className="w-full py-16 text-center text-base text-[#999]">
          {t("kudosFeed:feed.empty")}
        </p>
      ) : (
        posts.map((post) => (
          <KudoPostCard
            key={post.id}
            post={post}
            onHashtagClick={handleHashtagClick}
            onCopyLink={onCopyLink}
          />
        ))
      )}

      {hasMore && (
        <div ref={sentinelRef} className="h-4 w-full" aria-hidden />
      )}
    </div>
  );
}
