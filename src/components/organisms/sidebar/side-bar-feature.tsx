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

export const SideBarFeature = (props: { feature: SideBarFeatureProps; isExpanded: boolean }) => {
  const { feature, isExpanded } = props;
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
      <li className={cn("mt-0 md:mt-2", className)}>
        <Link
          draggable={false}
          to={to}
          disabled={!!feature.child}
          className="cursor-pointer"
          {...(feature.child ? { onClick: toggleShow } : {})}
        >
          <div
            className={cn(
              "flex min-h-10 h-fit items-center rounded-lg p-3 transition-all duration-300",
              isExpanded && "gap-2.5",
              isActive
                ? "bg-[#FCE3B4] hover:bg-[#FCE3B4]/80"
                : "bg-transparent hover:bg-neutral-50",
              !isExpanded && isSelectChild && "bg-neutral-100"
            )}
          >
            <div
              className={cn(
                "mx-2 h-full w-6 items-center justify-center inline-flex flex-col",
                isExpanded ? "w-6" : "w-full mx-1"
              )}
            >
              {activeIcon &&
                icon &&
                React.cloneElement((isActive ? activeIcon : icon) as React.ReactElement)}
            </div>

            <div
              className={cn(
                "flex h-full flex-1 flex-row items-start justify-between",
                isExpanded ? "opacity-100" : "opacity-0"
              )}
            >
              <span
                className={cn(
                  "flex flex-1 select-none items-center text-nowrap text-small font-medium duration-300",
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
              <SideBarFeature feature={x} isExpanded={isExpanded} key={x.to} />
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
