import { ChevronLeft } from "lucide-react";
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
    <aside
      className={cn(
        "h-full transform border-r bg-white transition-all ease-in-out",
        isSidebarOpen ? "w-[280px]" : "w-fit"
      )}
    >
      <div className="relative flex h-full flex-col px-4 pb-4 pt-9">
        <nav className="flex h-screen w-full flex-col justify-between">
          <div>
            <div
              className={cn(
                "flex flex-row items-center justify-between transition-all duration-300 ease-in-out",
                !isSidebarOpen && "justify-center"
              )}
            >
              <img
                src={isSidebarOpen ? Logo : AppIcon}
                className={cn(
                  "h-6 transition-transform duration-300 ease-in-out",
                  isSidebarOpen ? "pl-4" : "h-10 rounded-md"
                )}
                alt="App Logo"
              />

              <div
                className={cn(
                  "size-6 cursor-pointer rounded-full transition-transform duration-300 ease-in-out hover:bg-[#FCE3B4]/80",
                  isSidebarOpen ? "rotate-0" : "absolute right-0 translate-x-3 rotate-180 bg-white"
                )}
                onClick={() => setSidebarOpen((prev) => !prev)}
              >
                <ChevronLeft color="#EE5D28" />
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
  );
}
