import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import useBreakPoint from "../../../hooks/use-screen-size";

export interface SideBarFeatureProps {
  to: string;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  label: string;
  child?: SideBarFeatureProps[];
  className?: string;
}

export const SideBarFeature = (props: {
  feature: SideBarFeatureProps;
  isExpanded: boolean;
  isChild?: boolean;
}) => {
  const { feature, isExpanded, isChild = false } = props;
  const { to, icon = null, activeIcon = null, label, className } = feature;
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = feature.child ? false : location.pathname.includes(to);

  const isSelectChild =
    feature.child && feature.child.find((x) => location.pathname.includes(x.to));

  const [isShowChild, setIsShowChild] = useState(false);

  const toggleShow = () => setIsShowChild((prev) => !prev);

  const Content = () => {
    return (
      <li>
        <Link
          draggable={false}
          to={to}
          disabled={!!feature.child || (!isExpanded && isChild)}
          className={cn("cursor-pointer", className)}
          {...(feature.child ? { onClick: toggleShow } : {})}
        >
          <div
            className={cn(
              "flex min-h-10 h-fit items-center rounded-lg p-3 transition-all duration-300",
              isExpanded && "mx-1 gap-2.5",
              isActive
                ? "bg-[#FCE3B4] hover:bg-[#FCE3B4]/80"
                : "bg-transparent hover:bg-neutral-50",
              isChild && !isExpanded && "bg-transparent hover:bg-transparent",
              !isExpanded && isSelectChild && "bg-neutral-100"
            )}
          >
            <div className="relative h-full w-8 items-center justify-center">
              <div className="flex h-full flex-1 items-center justify-center">
                {activeIcon &&
                  icon &&
                  React.cloneElement((isActive ? activeIcon : icon) as React.ReactElement)}
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
                  "absolute bottom-0 left-0 right-0 top-0 flex flex-1 select-none items-center text-nowrap text-small font-medium duration-300",
                  isActive ? "text-primary-700" : "text-supporting-text"
                )}
              >
                {t(`navigation.${label}`)}
              </span>

              {isExpanded && !!feature.child && (
                <ChevronDown
                  className={cn(
                    "absolute right-2 text-sm text-supporting-text duration-300",
                    isShowChild ? "rotate-180" : "rotate-0"
                  )}
                  size={20}
                />
              )}
            </div>
          </div>
        </Link>

        {isShowChild && feature.child && feature.child.length && (
          <ul className="mt-[2px] divide-y-2 divide-transparent duration-300">
            {feature.child.map((x) => (
              <SideBarFeature feature={x} isExpanded={isExpanded} isChild key={x.to} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  const breakpoint = useBreakPoint();

  if (breakpoint === "xs") {
    return <Content />;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Content />
        </TooltipTrigger>
        {!isExpanded && (
          <TooltipContent className="bg-white shadow-md" side="right">
            <span className={cn("text-small font-semibold text-black")}>
              {t(`navigation.${label}`)}
            </span>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
