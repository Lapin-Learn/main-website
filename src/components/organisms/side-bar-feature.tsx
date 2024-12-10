import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

export interface SideBarFeatureProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  child?: SideBarFeatureProps[];
}

export const SideBarFeature = (props: {
  feature: SideBarFeatureProps;
  isExpanded: boolean;
  isChild?: boolean;
}) => {
  const { feature, isExpanded, isChild = false } = props;
  const { to, icon, label } = feature;
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = feature.child ? false : location.pathname.includes(to);

  const isSelectChild =
    feature.child && feature.child.find((x) => location.pathname.includes(x.to));

  const [isShowChild, setIsShowChild] = useState(false);

  const toggleShow = () => setIsShowChild((prev) => !prev);

  return (
    <li>
      <Link
        draggable={false}
        to={to}
        disabled={!!feature.child || (!isExpanded && isChild)}
        className="cursor-pointer"
        {...(feature.child ? { onClick: toggleShow } : {})}
      >
        <div
          className={cn(
            "flex h-fit items-center gap-2.5 rounded-lg p-4 transition-all duration-300",
            isExpanded && "mx-2",
            isActive ? "bg-[#FCE3B4] hover:bg-[#FCE3B4]/80" : "bg-transparent hover:bg-neutral-50",
            isChild && !isExpanded && "bg-transparent hover:bg-transparent",
            !isExpanded && isSelectChild && "bg-neutral-100"
          )}
        >
          <div className="relative h-full w-10 items-center justify-center">
            <div className="flex h-full flex-1 items-center justify-center text-blue-500">
              {
                <>
                  {React.cloneElement(
                    icon as React.ReactElement,
                    isActive ? { fill: "#c2410c" } : { fill: "#B4B4B4" }
                  )}
                </>
              }
            </div>
          </div>

          <div
            className={cn(
              "relative flex h-full flex-1 flex-col items-end justify-center",
              isExpanded ? "opacity-100" : "opacity-0"
            )}
          >
            <span
              className={cn(
                "absolute bottom-0 left-0 right-0 top-0 flex flex-1 select-none items-center text-nowrap text-small font-semibold duration-300",
                isActive ? "text-orange-700" : "text-neutral-200"
              )}
            >
              {t(`navigation.${label}`)}
            </span>

            {isExpanded && !!feature.child && (
              <ChevronDown
                className={cn(
                  "absolute right-2 text-sm text-[#6B7280] duration-300",
                  isShowChild ? "rotate-180" : "rotate-0"
                )}
              />
            )}
          </div>
        </div>
      </Link>

      {isShowChild && feature.child && feature.child.length && (
        <ul className="mt-[2px] divide-y-2 divide-transparent duration-300">
          {feature.child.map((x) => {
            return (
              <div key={x.to}>
                <SideBarFeature feature={x} isExpanded={isExpanded} isChild />
              </div>
            );
          })}
        </ul>
      )}
    </li>
  );
};
