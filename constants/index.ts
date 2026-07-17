export interface SaaHashtag {
  label: string;
  value: number;
}

export const SAA_HASHTAGS: readonly SaaHashtag[] = [
  { label: "High-performing", value: 1 },
  { label: "Be Professional", value: 2 },
  { label: "Be Optimistic", value: 3 },
  { label: "Be A Team", value: 4 },
  { label: "Think Outside The Box", value: 5 },
  { label: "Get Risky", value: 6 },
  { label: "Go Fast", value: 7 },
  { label: "Wasshoi", value: 8 },
];

/** Look up a hashtag's display label by its numeric id (fallback: empty string). */
export function saaHashtagLabel(value: number): string {
  return SAA_HASHTAGS.find((h) => h.value === value)?.label ?? "";
}

export interface NavRoute {
  /** i18n label key in the "nav" namespace. */
  key: string;
  /** Real route path. */
  url: string;
}

/**
 * Primary nav routes, shared by the site header (`nav-links.tsx`) and footer
 * (`site-footer.tsx`) so both stay in sync. Each entry's label comes from the
 * "nav" i18n namespace; the active item is the one whose `url` matches the
 * current pathname.
 */
export const ROUTERS: readonly NavRoute[] = [
  { key: "aboutSaa", url: "/about" },
  { key: "awardInformation", url: "/award-info" },
  { key: "sunKudos", url: "/sun-kudos" },
];

/** Max images attachable to a single KUDOS (Figma "Image" field cap). */
export const KUDOS_MAX_IMAGES = 5;

/** Max hashtags selectable on a single KUDOS (SAA hashtag picker cap). */
export const KUDOS_MAX_HASHTAGS = 5;
