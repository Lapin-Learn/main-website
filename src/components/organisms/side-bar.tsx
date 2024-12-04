import { LogOut } from "lucide-react";

import MissionsIcon from "@/assets/icons/missions";
import PracticeIcon from "@/assets/icons/practice";
import AppIcon from "@/assets/images/app.jpg";
import Logo from "@/assets/logo.svg";

import { SideBarFeature, SideBarFeatureProps } from "./side-bar-feature";
import { Separator } from "../ui";

const features: SideBarFeatureProps[] = [
  {
    to: "/practice",
    icon: <PracticeIcon />,
    label: "Practice",
  },
  { to: "/missions", icon: <MissionsIcon />, label: "Mission" },
];

export default function SideBar() {
  return (
    <aside className="h-full w-[280px] shrink-0 border-r">
      <div className="relative flex h-full flex-col py-[36px]">
        <nav className="flex h-screen w-full flex-col justify-between">
          <div>
            <img src={Logo} className="ml-5 h-6" />
            <ul className="flex w-full flex-col space-y-2 overflow-hidden pt-6">
              {features.map((feat, idx) => {
                if (typeof feat === "object")
                  return <SideBarFeature key={idx} feature={feat} isExpanded={true} />;
                return <div key={idx} className="h-px w-full bg-border" />;
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-2 p-2">
            <Separator />
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center justify-center gap-2">
                <img src={AppIcon} className="size-10 rounded-sm" />
                <div className="w-full">
                  <p className="text-small font-semibold text-black">Lapin Learn</p>
                  <p className="truncate text-xs text-supporting-text">lapinlearn@gmail.com</p>
                </div>
              </div>
              <LogOut className="size-5" />
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
