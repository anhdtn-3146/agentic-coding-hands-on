"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useClickOutside } from "@/hooks/use-click-outside";

/** User-profile icon. Single-color -> inlined with currentColor. */
function IconUserProfile(props: React.SVGProps<SVGSVGElement>) {
  return (
    // mm:I2167:9091;186:1597;186:1420
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 4C13.0609 4 14.0783 4.42143 14.8284 5.17157C15.5786 5.92172 16 6.93913 16 8C16 9.06087 15.5786 10.0783 14.8284 10.8284C14.0783 11.5786 13.0609 12 12 12C10.9391 12 9.92172 11.5786 9.17157 10.8284C8.42143 10.0783 8 9.06087 8 8C8 6.93913 8.42143 5.92172 9.17157 5.17157C9.92172 4.42143 10.9391 4 12 4ZM12 14C16.42 14 20 15.79 20 18V20H4V18C4 15.79 7.58 14 12 14Z"
        fill="currentColor"
      />
    </svg>
  );
}

const MENU_ITEM_CLASSES =
  "block w-full px-4 py-3 text-left text-sm font-bold tracking-[0.1px] text-white transition-colors duration-200 hover:bg-white/10";

/**
 * User-profile avatar (spec A1.8). Toggles a menu with Profile / Sign out /
 * Admin Dashboard. Presentational except "Sign out", which navigates to the
 * login page -- there is no real auth/session wiring here.
 */
export default function UserMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useClickOutside(containerRef, () => setOpen(false), open);

  return (
    // mm:I2167:9091;186:1597
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label="User profile"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded border border-[#998C5F] bg-transparent p-2.5 text-white"
      >
        <IconUserProfile className="h-6 w-6" aria-hidden="true" />
      </button>

      {open && (
        <ul
          role="menu"
          aria-label="User menu"
          className="absolute top-full right-0 z-30 mt-1 w-48 overflow-hidden rounded bg-[#101417] shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
        >
          <li role="none">
            <button type="button" role="menuitem" className={MENU_ITEM_CLASSES}>
              {t("common:userMenu.profile")}
            </button>
          </li>
          <li role="none">
            <button type="button" role="menuitem" className={MENU_ITEM_CLASSES}>
              {t("common:userMenu.adminDashboard")}
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                router.push("/login");
              }}
              className={MENU_ITEM_CLASSES}
            >
              {t("common:userMenu.signOut")}
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
