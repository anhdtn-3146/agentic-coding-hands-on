"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import KudosFormModal from "@/components/kudos/kudos-form-modal";
import CustomSvgIcon from "../common/custom-svg-icon";

/**
 * "Ghi nhận" pill — Figma "A.1_Button ghi nhận" (2940:13449). Opens the
 * shared `KudosFormModal` on click. The sibling "Tìm kiếm sunner" search pill
 * (2940:13450) is a separate, not-yet-assigned piece of this row and is
 * intentionally out of scope here.
 */
export default function WriteKudosBar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* mm:2940:13449 */}
      <div className="mx-auto w-full max-w-[1152px] px-6 lg:px-0">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex w-full max-w-[738px] items-center gap-2 rounded-[68px] border border-[#998C5F] bg-[#FFEA9E]/10 px-4 py-6 text-left transition-colors hover:bg-[#FFEA9E]/20 sm:px-6"
        >
          {/* mm:I2940:13449;186:2758 Frame 483 */}

          <span className="flex items-center gap-4">
            {/* mm:I2940:13449;186:2759 MM_MEDIA_Pen */}
            <CustomSvgIcon
              src="/kudos/highlight/pen.svg"
              className="h-8 w-8 text-white"
            />
            {/* mm:I2940:13449;186:2760 */}
            <span className="font-(family-name:--font-montserrat) text-base leading-6 font-bold tracking-[0.15px] text-white">
              {t("kudosBoard:writeBar.placeholder")}
            </span>
          </span>
        </button>
      </div>

      <KudosFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
