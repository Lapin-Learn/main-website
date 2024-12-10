import { Link } from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";

import MissionsIcon from "@/assets/icons/missions";
import PracticeIcon from "@/assets/icons/practice";
import Logo from "@/assets/logo.svg";
import { useSignOut } from "@/hooks/react-query/useAuth";
import { useUserAvatar, useUserProfile } from "@/hooks/react-query/useUsers";

import { Separator } from "../ui";
import { Skeleton } from "../ui/skeleton";
import { SideBarFeature, SideBarFeatureProps } from "./side-bar-feature";

const features: SideBarFeatureProps[] = [
  {
    to: "/practice",
    icon: <PracticeIcon />,
    label: "practice",
  },
  { to: "/missions", icon: <MissionsIcon />, label: "mission" },
];

export default function SideBar() {
  const signOut = useSignOut();
  const { avatar } = useUserAvatar();
  const { data: user, isSuccess } = useUserProfile();
  return (
    <aside className="h-full w-[280px] shrink-0 border-r bg-white">
      <div className="relative flex h-full flex-col px-4 pb-4 pt-9">
        <nav className="flex h-screen w-full flex-col justify-between">
          <div>
            <img src={Logo} className="ml-5 h-6" />
            <Separator className="mt-6" />
            <ul className="flex w-full flex-col space-y-2 overflow-hidden pt-3">
              {features.map((feat, idx) => {
                if (typeof feat === "object")
                  return <SideBarFeature key={idx} feature={feat} isExpanded={true} />;
                return <div key={idx} className="h-px w-full bg-border" />;
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-4 p-2">
            <Separator />
            <Link to="/profile">
              <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex flex-row items-center justify-center gap-2">
                  {avatar ? (
                    <img src={avatar.url} className="!size-10 rounded-full" />
                  ) : (
                    <div className="grid !size-10 place-items-center rounded-full bg-neutral-100 text-white">
                      <User size={20} />
                    </div>
                  )}
                  <div className="flex h-10 w-full flex-1 flex-col justify-between overflow-hidden">
                    {user && isSuccess ? (
                      <>
                        <p className="text-small font-semibold text-black">{user.fullName}</p>
                        <p className="text-supporting-text truncate text-xs">{user.email}</p>
                      </>
                    ) : (
                      <>
                        <Skeleton className="h-[17px] w-20" />
                        <Skeleton className="w-22 h-[17px]" />
                      </>
                    )}
                  </div>
                </div>
                <button onClick={() => signOut.mutate()}>
                  <LogOut size={20} />
                </button>
              </div>
            </Link>
          </div>
        </nav>
      </div>
    </aside>
  );
}
