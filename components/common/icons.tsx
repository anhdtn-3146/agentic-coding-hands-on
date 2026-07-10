/**
 * Shared single-color icons. The SVG shape is sourced from a file in
 * `public/icons/` via CSS mask, and colored with `currentColor` (background) so
 * callers still set the color via `text-*` — the same icon renders dark on the
 * yellow buttons and white elsewhere.
 */

interface IconProps {
  /** Extra classes (sizing/color). Defaults to 24x24. */
  className?: string;
}

/** Shared mask-image style so every icon crops/positions identically. */
function maskStyle(src: string): React.CSSProperties {
  return {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };
}

/** Up-right arrow — `public/icons/icon_up.svg` (Figma "MM_MEDIA_Up"). */
export function IconUp({ className = "" }: IconProps) {
  return (
    <span
      aria-hidden
      className={`inline-block h-6 w-6 shrink-0 bg-current ${className}`}
      style={maskStyle("/icons/icon_up.svg")}
    />
  );
}

/** Target-with-arrow icon — bullseye rings + an arrow striking the centre from
 * the top-right, per Figma "MM_MEDIA_Target". `public/icons/icon_target.svg`. */
export function IconTarget({ className = "" }: IconProps) {
  return (
    <span
      aria-hidden
      className={`inline-block h-6 w-6 shrink-0 bg-current ${className}`}
      style={maskStyle("/icons/icon_target.svg")}
    />
  );
}

/** Diamond icon — `public/icons/icon_diamond.svg` (Figma "MM_MEDIA_Diamond"). */
export function IconDiamond({ className = "" }: IconProps) {
  return (
    <span
      aria-hidden
      className={`inline-block h-6 w-6 shrink-0 bg-current ${className}`}
      style={maskStyle("/icons/icon_diamond.svg")}
    />
  );
}

/** License icon — `public/icons/icon_license.svg` (Figma "MM_MEDIA_License"). */
export function IconLicense({ className = "" }: IconProps) {
  return (
    <span
      aria-hidden
      className={`inline-block h-6 w-6 shrink-0 bg-current ${className}`}
      style={maskStyle("/icons/icon_license.svg")}
    />
  );
}
