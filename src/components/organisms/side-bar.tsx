import { LogOut } from "lucide-react";

import MissionsIcon from "@/assets/icons/missions";
import PracticeIcon from "@/assets/icons/practice";
import AppIcon from "@/assets/images/app.jpg";
import Logo from "@/assets/logo.svg";

import { SideBarFeature, SideBarFeatureProps } from "./side-bar-feature";
import { Separator } from "../ui";
import { useSignOut } from "@/hooks/react-query/useAuth";
import { useUserProfile } from "@/hooks/react-query/useUsers";

const features: SideBarFeatureProps[] = [
  {
    to: "/practice",
    icon: <PracticeIcon />,
    label: "Luyện tập",
  },
  { to: "/missions", icon: <MissionsIcon />, label: "Nhiệm vụ" },
];

export default function SideBar() {
  const signOut = useSignOut();
  const { data: user } = useUserProfile();
  return (
    <aside className="h-full w-[280px] shrink-0 border-r bg-white">
      <div className="relative flex h-full flex-col px-4 pb-4 pt-9">
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
          <div className="flex flex-col gap-4 p-2">
            <Separator />
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-row items-center justify-center gap-2">
                <img
                  src={user?.avatar?.url ? user?.avatar?.url : AppIcon}
                  className="size-10 rounded-sm"
                />
                <div className="w-full">
                  <p className="text-small font-semibold text-black">
                    {user?.fullName ? user.fullName : "LapinLearn"}
                  </p>
                  <p className="text-supporting-text truncate text-xs">
                    {user?.email ? user.email : "LapinLearn"}
                  </p>
                </div>
              </div>
              <button onClick={() => signOut.mutate()}>
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
