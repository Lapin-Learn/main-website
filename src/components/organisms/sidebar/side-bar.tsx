import { useLocation, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Menu } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import AppIcon from "@/assets/images/app.jpg";
import Logo from "@/assets/logo.svg";
import { useAccountIdentifier } from "@/hooks/react-query/useUsers";
import useBreakPoint from "@/hooks/use-screen-size";
import { EnumRole } from "@/lib/enums";
import { cn } from "@/lib/utils";

import { Separator } from "../../ui";
import ChangeLanguageSwitch from "./change-language-switch";
import { adminFeatures, features } from "./features";
import MissionButton from "./mission-button";
import { SideBarFeature } from "./side-bar-feature";
import { SideBarProfile } from "./side-bar-profile";
import StreakButton from "./streak-button";

export default function SideBar() {
  const breakpoint = useBreakPoint();
  const [isSidebarOpen, setSidebarOpen] = useState(breakpoint !== "xs");
  const { checkRole } = useAccountIdentifier();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleNavigateHome = () => {
    navigate({ to: "/" });
  };

  useEffect(() => {
    const upperBreakpoints = ["2xl", "xl", "lg", "md"];
    if (!upperBreakpoints.includes(breakpoint)) setSidebarOpen(false);
  }, [breakpoint]);

  useEffect(() => {
    if (breakpoint === "xs" && isSidebarOpen) {
      setSidebarOpen(false);
    }
  }, [pathname, breakpoint]);

  return (
    <>
      {/* MOBILE */}
      <div className="sticky top-0 flex w-full items-center justify-between bg-white p-4 shadow-md md:hidden md:pt-8">
        <img
          src={Logo}
          alt="App Logo"
          className="h-5 cursor-pointer"
          onClick={handleNavigateHome}
        />
        <button onClick={() => setSidebarOpen((prev) => !prev)} aria-label="Open Sidebar">
          <Menu size={24} />
        </button>
      </div>
      {isSidebarOpen && <div className="absolute top-0 h-screen w-screen bg-black/20 md:hidden" />}

      {/* DESKTOP */}
      <aside
        className={cn(
          "fixed h-full border-r bg-white transition-all sm:left-0 duration-300 md:flex md:static top-0",
          isSidebarOpen ? "right-0 w-[280px]" : "right-[-280px] w-0 sm:w-[80px]"
        )}
      >
        <div className="relative flex size-full flex-col px-3 py-4 md:pt-9">
          <nav className="flex h-screen w-full flex-col justify-between">
            <div>
              <div
                className={cn(
                  "flex flex-row items-center justify-between",
                  !isSidebarOpen && "justify-center"
                )}
              >
                <img
                  src={Logo}
                  className={cn(
                    "h-4 md:h-6 transition-transform duration-300 sm:flex cursor-pointer",
                    isSidebarOpen ? "pl-4" : "h-0"
                  )}
                  alt="App Logo"
                  onClick={handleNavigateHome}
                />
                <img
                  src={AppIcon}
                  className={cn(
                    "h-0 transition-transform duration-300 sm:flex cursor-pointer",
                    isSidebarOpen ? "pl-4" : "h-10 rounded-md"
                  )}
                  alt="App Logo"
                  onClick={handleNavigateHome}
                />

                <motion.div>
                  <button
                    className={cn(
                      "grid size-9 cursor-pointer place-items-center rounded-full border bg-white text-neutral-400 shadow-md transition-all duration-300 hover:text-neutral-700",
                      isSidebarOpen
                        ? "left-0 [&_svg]:rotate-180 [&_svg]:sm:rotate-0"
                        : "absolute right-0 hidden translate-x-1/2 sm:grid sm:place-items-center [&_svg]:rotate-180"
                    )}
                    onClick={() => setSidebarOpen((prev) => !prev)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                </motion.div>
              </div>
              <Separator className="mt-3 md:mt-6" />
              <ul className="flex w-full flex-col overflow-hidden">
                {(checkRole(EnumRole.learner) ? features : adminFeatures).map((feat, idx) => {
                  if (typeof feat === "object")
                    return (
                      <SideBarFeature
                        key={idx}
                        feature={feat}
                        isExpanded={isSidebarOpen}
                        isChild={Boolean(!feat.child)}
                      />
                    );
                  return <div key={idx} className="h-px w-full bg-border" />;
                })}
                <MissionButton />
                <StreakButton />
              </ul>
            </div>

            <div>
              <ChangeLanguageSwitch className={!isSidebarOpen ? "hidden" : ""} />
              <SideBarProfile isSidebarOpen={isSidebarOpen} />
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
