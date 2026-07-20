"use client";

import { useMemo, useRef, useState, type PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import SpotlightNameNode from "./spotlight-name-node";
import SpotlightZoomControls from "./spotlight-zoom-controls";
import CustomSvgIcon from "@/components/common/custom-svg-icon";
import {
  SPOTLIGHT_NAMES,
  SPOTLIGHT_TICKER_MESSAGE,
  SPOTLIGHT_TICKER_OPACITIES,
  SPOTLIGHT_TOTAL_KUDOS,
} from "./spotlight-mock-data";

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 2;
const ZOOM_STEP = 0.25;
const BOARD_WIDTH = 1157;
const BOARD_HEIGHT = 548;

/**
 * Spotlight board — Figma "B.7_Spotlight" (node 2940:14174), 1157x548 rounded
 * frame with a scattered name cloud. Search filters names, the pan/zoom
 * button toggles a small zoom control popover, and dragging pans the cloud
 * when zoomed in (CSS transform only — no canvas/physics engine, per
 * clarifications.md).
 */
export default function SpotlightBoard() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [zoomControlsOpen, setZoomControlsOpen] = useState(false);
  const dragState = useRef<{
    startX: number;
    startY: number;
    panX: number;
    panY: number;
  } | null>(null);

  const filteredNames = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return SPOTLIGHT_NAMES;
    return SPOTLIGHT_NAMES.filter((item) =>
      item.name.toLowerCase().includes(query),
    );
  }, [searchTerm]);

  const clampPan = (value: { x: number; y: number }, currentZoom: number) => {
    const maxOffset = ((currentZoom - 1) / 2) * BOARD_WIDTH;
    const maxOffsetY = ((currentZoom - 1) / 2) * BOARD_HEIGHT;
    return {
      x: Math.min(Math.max(value.x, -maxOffset), maxOffset),
      y: Math.min(Math.max(value.y, -maxOffsetY), maxOffsetY),
    };
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    dragState.current = {
      startX: event.clientX,
      startY: event.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    const dx = event.clientX - dragState.current.startX;
    const dy = event.clientY - dragState.current.startY;
    setPan(
      clampPan(
        { x: dragState.current.panX + dx, y: dragState.current.panY + dy },
        zoom,
      ),
    );
  };

  const stopDragging = () => {
    dragState.current = null;
  };

  const applyZoom = (next: number) => {
    const clamped = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));
    setZoom(clamped);
    setPan((current) => clampPan(current, clamped));
  };

  return (
    <div className="font-(family-name:--font-montserrat) relative mx-auto h-137 w-full max-w-289.25 overflow-hidden rounded-[47px] border border-[#998C5F] bg-[#0A1119]">
      {/* Decorative background — the design uses bespoke artwork here (Figma
          "Root further mo rong 1" / "image 24" / "image 25") that isn't an
          exported MM_MEDIA asset; approximated with a dark gradient + soft
          color bloom to keep the same mood without inventing an asset. */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#0A1119] via-[#050C12] to-black" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-linear-to-tr from-orange-500/25 via-red-500/15 to-blue-500/20 blur-3xl" />

      {/* mm:2940:14833 B.7.3_Tìm kiếm sunner */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-2 rounded-full border border-[#998C5F]/70 bg-[#FFEA9E]/10 px-3 py-2">
        <CustomSvgIcon src="/icons/search.svg" className="h-3 w-3 text-white" />
        <input
          type="text"
          value={searchTerm}
          maxLength={100}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={t("kudosSpotlight:search.placeholder")}
          aria-label={t("kudosSpotlight:search.placeholder")}
          className="w-32 bg-transparent text-[11px] font-medium text-white placeholder-white/70 outline-none"
        />
      </div>

      {/* mm:3007:17482 B.7.1_388 KUDOS */}
      <p className="absolute top-4 left-1/2 z-10 -translate-x-1/2 text-[28px] font-bold text-white sm:text-[36px]">
        {t("kudosSpotlight:board.kudosCount", { count: SPOTLIGHT_TOTAL_KUDOS })}
      </p>

      {/* Name cloud — draggable when zoomed in */}
      <div
        className={`absolute inset-0 touch-none ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : ""}`}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerLeave={stopDragging}
      >
        {filteredNames.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-center">
            <p className="text-base font-bold text-white">
              {t("kudosSpotlight:emptyState.title")}
            </p>
            <p className="text-xs text-white/60">
              {t("kudosSpotlight:emptyState.description")}
            </p>
          </div>
        ) : (
          filteredNames.map((item) => (
            <SpotlightNameNode
              key={item.id}
              data={item}
              isHovered={hoveredId === item.id}
              onHoverChange={setHoveredId}
            />
          ))
        )}
      </div>

      {/* Decorative "recent activity" ticker — node 2940:14230 + 3004:15995-15999 */}
      <div className="pointer-events-none absolute bottom-6 left-6 z-0 flex max-w-[70%] flex-col gap-0.75 overflow-hidden">
        {SPOTLIGHT_TICKER_OPACITIES.map((opacity, index) => (
          <p
            key={index}
            style={{ opacity }}
            className="truncate text-sm font-bold tracking-[0.1px] text-white"
          >
            {SPOTLIGHT_TICKER_MESSAGE}
          </p>
        ))}
      </div>

      {/* mm:3007:17479 B.7.2_Pan zoom */}
      <SpotlightZoomControls
        zoom={zoom}
        isOpen={zoomControlsOpen}
        onToggle={() => setZoomControlsOpen((open) => !open)}
        onZoomIn={() => applyZoom(zoom + ZOOM_STEP)}
        onZoomOut={() => applyZoom(zoom - ZOOM_STEP)}
        onReset={() => applyZoom(1)}
      />
    </div>
  );
}
