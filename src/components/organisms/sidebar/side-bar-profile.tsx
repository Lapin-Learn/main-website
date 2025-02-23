import { Link } from "@tanstack/react-router";
import { User } from "lucide-react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAccountIdentifier, useUserAvatar, useUserProfile } from "@/hooks/react-query/useUsers";
import useBreakPoint from "@/hooks/use-screen-size";
import { EnumRole } from "@/lib/enums";
import { cn } from "@/lib/utils";

import LogoutAlert from "./logout-alert";

export const SideBarProfile = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const { avatar } = useUserAvatar();
  const isMobile = useBreakPoint() === "xs";
  return (
    <div className="flex flex-col gap-4 p-2">
      <Separator />
      <HoverCard>
        <HoverCardTrigger asChild>
          <div
            className={cn(
              "flex flex-row items-center justify-center",
              isSidebarOpen && "items-center gap-2"
            )}
          >
            <Link to={isMobile ? "/profile" : "/profile/history"}>
              <div
                className={cn(
                  "flex flex-row items-center justify-center",
                  isSidebarOpen && "items-center gap-2"
                )}
              >
                {avatar ? (
                  <img src={avatar.url} className="!size-10 rounded-full" />
                ) : (
                  <div className="grid !size-10 place-items-center rounded-full bg-neutral-100 text-white">
                    <User size={20} />
                  </div>
                )}
                {isSidebarOpen && <ProfileTooltip />}
              </div>
            </Link>
            <LogoutAlert />
          </div>
        </HoverCardTrigger>
        {!isSidebarOpen && (
          <HoverCardContent className="size-fit">
            <div className={cn("flex flex-row items-center justify-center gap-2")}>
              <ProfileTooltip />
              <LogoutAlert />
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    </div>
  );
};

const ProfileTooltip = () => {
  const { data: user, isSuccess } = useUserProfile();
  const { checkRole } = useAccountIdentifier();

  return (
    <div className="flex h-10 w-full flex-1 flex-col justify-between overflow-hidden">
      {user && isSuccess ? (
        <>
          <p className="text-small font-semibold text-black">
            {checkRole(EnumRole.learner) ? user.fullName : "Super Admin"}
          </p>
          <p className="truncate text-xs text-supporting-text">{user.email}</p>
        </>
      ) : (
        <>
          <Skeleton className="h-[17px] w-20" />
          <Skeleton className="w-22 h-[17px]" />
        </>
      )}
    </div>
  );
};
