"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { KudoPost } from "@/components/kudos-board/feed-mock-data";
import HeroBadge from "@/components/common/hero-badge";
import FeedImageLightbox from "@/components/kudos-board/feed-image-lightbox";
import CustomSvgIcon from "@/components/common/custom-svg-icon";

const MAX_HASHTAGS = 5;

interface KudoPostCardProps {
  post: KudoPost;
  onHashtagClick: (tag: string) => void;
  onCopyLink: (url: string) => void;
}

/** `C.3_KUDO Post` instance (componentId 256:5231) — one card in the feed. */
export default function KudoPostCard({ post, onHashtagClick, onCopyLink }: KudoPostCardProps) {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  // Count is derived from `liked` (single source of truth) — keeping it as a
  // second state can drift from the flag under batched rapid clicks.
  const likeCount = post.likeCount + (liked ? 1 : 0);

  function toggleLike() {
    setLiked((prev) => !prev);
  }

  function handleCopyLink() {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/sun-kudos#${post.id}`
        : `/sun-kudos#${post.id}`;
    onCopyLink(url);
  }

  const visibleHashtags = post.hashtags.slice(0, MAX_HASHTAGS);
  const hasMoreHashtags = post.hashtags.length > MAX_HASHTAGS;

  return (
    // mm:256:5231 C.3_KUDO Post
    <article className="flex w-full flex-col items-start gap-4 rounded-3xl bg-[#FFF8E1] px-10 pt-10 pb-4 font-(family-name:--font-montserrat)">
      {/* mm:256:4857 Info user */}
      <div className="flex w-full items-start justify-between gap-6">
        <PersonBlock person={post.sender} />
        <div className="flex h-[123px] w-8 items-start py-4">
          <CustomSvgIcon src="/kudos/icons/send.svg" className="h-8 w-8 text-[#00101A]" />
        </div>
        <PersonBlock person={post.receiver} />
      </div>

      <div className="h-px w-full bg-[#FFEA9E]" />

      {/* mm:256:5645 Content */}
      <div className="flex w-full flex-col items-start gap-4">
        <p className="w-full text-base font-bold tracking-[0.5px] text-[#999]">{post.time}</p>

        {/* mm:2234:33038 D.4_hashtag (category chip) */}
        <div className="flex w-full items-center gap-2">
          <span className="text-base font-bold tracking-[0.5px] text-[#00101A]">
            {post.category}
          </span>
          <CustomSvgIcon src="/kudos/icons/pen.svg" className="h-8 w-8 text-[#00101A]" />
        </div>

        {/* mm:662:11382 Frame 425 (message box) */}
        <div className="w-full self-stretch rounded-xl border border-[#FFEA9E] bg-[#FFEA9E]/40 px-6 py-4">
          <p className="line-clamp-5 text-xl leading-8 font-bold text-[#00101A]">{post.message}</p>
        </div>

        {/* mm:256:5176 C.3.6_Image đính kèm */}
        <div className="flex w-full items-center gap-4">
          {post.attachments.map((src, index) => (
            <button
              key={`${post.id}-attachment-${index}`}
              type="button"
              onClick={() => setLightboxSrc(src)}
              className="relative aspect-square w-[88px] shrink-0 overflow-hidden rounded-[18px] border border-[#998C5F] bg-white"
            >
              <span className="absolute inset-0 m-px overflow-hidden rounded">
                <Image
                  src={src}
                  alt={t("kudosFeed:post.attachmentAlt")}
                  fill
                  className="rounded border border-[#FFEA9E] object-cover"
                  sizes="88px"
                />
              </span>
            </button>
          ))}
        </div>

        {/* mm:256:5158 C.3.7_Hash tag */}
        <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-1">
          {visibleHashtags.map((tag, index) => (
            <button
              key={`${post.id}-hashtag-${index}`}
              type="button"
              onClick={() => onHashtagClick(tag)}
              className="text-base font-bold tracking-[0.5px] text-[#D4271D] hover:underline"
            >
              #{tag}
            </button>
          ))}
          {hasMoreHashtags && (
            <span className="text-base font-bold tracking-[0.5px] text-[#D4271D]">
              {t("kudosFeed:post.moreHashtags")}
            </span>
          )}
        </div>
      </div>

      <div className="h-px w-full bg-[#FFEA9E]" />

      {/* mm:256:5194 C.4_Button */}
      <div className="flex w-full items-center justify-between gap-6">
        <button
          type="button"
          onClick={toggleLike}
          aria-pressed={liked}
          aria-label={t("kudosFeed:post.likeAria")}
          className="flex items-center gap-1"
        >
          <span className="text-2xl font-bold text-[#00101A]">
            {likeCount.toLocaleString("vi-VN")}
          </span>
          <CustomSvgIcon
            src="/kudos/icons/heart.svg"
            className={`h-8 w-8 ${liked ? "text-[#D4271D]" : "text-[#999]"}`}
          />
        </button>

        <button
          type="button"
          onClick={handleCopyLink}
          className="flex items-center gap-1 rounded p-4 text-[#00101A] hover:bg-black/5"
        >
          <span className="text-base font-bold tracking-[0.15px]">
            {t("kudosFeed:post.copyLink")}
          </span>
          <CustomSvgIcon src="/kudos/icons/link.svg" className="h-6 w-6" />
        </button>
      </div>

      {lightboxSrc && (
        <FeedImageLightbox
          src={lightboxSrc}
          alt={t("kudosFeed:post.attachmentAlt")}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </article>
  );
}

// mm:256:4830 (componentSetId 2009:13867) — sender/receiver info block, reused
// as-is for both roles (profile pages don't exist, so it's a no-op display).
function PersonBlock({ person }: { person: KudoPost["sender"] }) {
  return (
    <div className="flex w-[235px] flex-col items-center justify-center gap-3 text-center">
      <span className="relative block h-16 w-16 shrink-0 cursor-default overflow-hidden rounded-full border-[1.869px] border-white">
        <Image src={person.avatar} alt="" fill className="object-cover" sizes="64px" />
      </span>
      <span className="flex w-full flex-col items-center gap-0.5">
        <span className="w-full cursor-default text-base font-bold tracking-[0.15px] text-[#00101A]">
          {person.name}
        </span>
        <span className="flex items-center justify-center gap-2.5">
          <span className="text-sm font-bold tracking-[0.1px] text-[#999]">{person.dept}</span>
          <HeroBadge type={person.badge} label={person.badgeLabel} />
        </span>
      </span>
    </div>
  );
}
