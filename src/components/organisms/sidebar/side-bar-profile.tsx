import { Link } from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useSignOut } from "@/hooks/react-query/useAuth";
import { useUserAvatar, useUserProfile } from "@/hooks/react-query/useUsers";
import { cn } from "@/lib/utils";

export const SideBarProfile = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const { avatar } = useUserAvatar();
  return (
    <div className="flex flex-col gap-4 p-2">
      <Separator />
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link to="/profile">
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
        </HoverCardTrigger>
        {!isSidebarOpen && (
          <HoverCardContent className="size-fit">
            <div className={cn("flex flex-row items-center justify-center gap-2")}>
              <ProfileTooltip />
            </div>
          </HoverCardContent>
        )}
      </HoverCard>
    </div>
  );
};

const ProfileTooltip = () => {
  const signOut = useSignOut();
  const { data: user, isSuccess } = useUserProfile();
  return (
    <>
      <div className="flex h-10 w-full flex-1 flex-col justify-between overflow-hidden">
        {user && isSuccess ? (
          <>
            <p className="text-small font-semibold text-black">{user.fullName}</p>
            <p className="truncate text-xs text-supporting-text">{user.email}</p>
          </>
        ) : (
          <>
            <Skeleton className="h-[17px] w-20" />
            <Skeleton className="w-22 h-[17px]" />
          </>
        )}
      </div>

      <button onClick={() => signOut.mutate()}>
        <LogOut size={20} />
      </button>
    </>
  );
};
