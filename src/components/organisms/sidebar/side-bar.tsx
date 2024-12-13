import { ChevronLeft, Menu } from "lucide-react";
import { useState } from "react";

import MissionsIcon from "@/assets/icons/missions";
import PracticeIcon from "@/assets/icons/practice";
import AppIcon from "@/assets/images/app.jpg";
import Logo from "@/assets/logo.svg";
import { cn } from "@/lib/utils";

import { Separator } from "../../ui";
import { SideBarFeature, SideBarFeatureProps } from "./side-bar-feature";
import { SideBarProfile } from "./side-bar-profile";

const features: SideBarFeatureProps[] = [
  {
    to: "/practice",
    icon: <PracticeIcon />,
    label: "practice",
  },
  { to: "/missions", icon: <MissionsIcon />, label: "mission" },
  {
    to: "/simulated-test",
    icon: <MissionsIcon />,
    label: "simulatedTest",
  },
];

export default function SideBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div className="fixed flex w-full items-center justify-between bg-white p-4 pt-8 sm:hidden">
        <img src={Logo} alt="App Logo" className="h-6" />
        <button onClick={() => setSidebarOpen((prev) => !prev)} aria-label="Open Sidebar">
          <Menu size={24} />
        </button>
      </div>

      <aside
        className={cn(
          "fixed h-full border-r bg-white transition-all duration-300 ease-in-out sm:static",
          isSidebarOpen ? "right-0 w-[280px] sm:left-0" : "right-[-280px] w-0 sm:left-0 sm:w-fit"
        )}
      >
        <div className="relative flex h-full flex-col px-4 pb-4 pt-9">
          <nav className="flex h-screen w-full flex-col justify-between">
            <div>
              <div
                className={cn(
                  "flex flex-row items-center justify-between",
                  !isSidebarOpen && "justify-center"
                )}
              >
                <img
                  src={isSidebarOpen ? Logo : AppIcon}
                  className={cn(
                    "hidden h-6 transition-transform duration-300 ease-in-out sm:flex",
                    isSidebarOpen ? "pl-4" : "h-10 rounded-md"
                  )}
                  alt="App Logo"
                />

                <div
                  className={cn(
                    "size-fit cursor-pointer rounded-full transition-transform duration-300 ease-in-out",
                    isSidebarOpen
                      ? "left-0 rotate-180 sm:rotate-0"
                      : "absolute right-0 hidden translate-x-3 rotate-180 border-l bg-white sm:flex"
                  )}
                  onClick={() => setSidebarOpen((prev) => !prev)}
                >
                  <ChevronLeft size={28} />
                </div>
              </div>
              <Separator className="mt-6" />
              <ul className="flex w-full flex-col space-y-2 overflow-hidden pt-3">
                {features.map((feat, idx) => {
                  if (typeof feat === "object")
                    return <SideBarFeature key={idx} feature={feat} isExpanded={isSidebarOpen} />;
                  return <div key={idx} className="h-px w-full bg-border" />;
                })}
              </ul>
            </div>
            <SideBarProfile isSidebarOpen={isSidebarOpen} />
          </nav>
        </div>
      </aside>
    </>
  );
}
