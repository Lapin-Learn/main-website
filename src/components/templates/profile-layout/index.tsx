import { Outlet } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { GamificationStats } from "@/components/organisms/gamification-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetGamificationProfile } from "@/hooks/react-query/useGamification";
import { useUserProfile } from "@/hooks/react-query/useUsers";

import Avatar from "./avatar";
import ProfileTab from "./profile-tab";

const profileTabItems = [
  {
    label: "history",
    to: "/profile/history",
  },
  {
    label: "profile",
    to: "/profile",
  },
  {
    label: "changePassword",
    to: "/profile/change-password",
  },
];

const ProfileLayout = () => {
  const { data: user, isLoading } = useUserProfile();
  const { data: gamificationData } = useGetGamificationProfile();
  const { t } = useTranslation("profile");
  return (
    <div className="col-span-3 p-8">
      <h1 className="mb-6 text-2xl font-semibold">{t("pageTitle")}</h1>
      <div className="overflow-hidden rounded-3xl bg-white pb-8">
        <img
          className="h-40 w-full object-cover"
          src="https://images.unsplash.com/photo-1513077202514-c511b41bd4c7?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="grid grid-cols-4 gap-8 px-8 pt-4">
          <ProfileTab items={profileTabItems} />
          <div className="relative col-span-3 pt-16">
            <div className="absolute top-0 -mt-4 flex w-full -translate-y-1/2 flex-row items-end gap-4">
              <Avatar />
              <div className="flex flex-1 grow">
                {isLoading ? (
                  <>
                    <Skeleton className="mb-2 h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </>
                ) : (
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <h5 className="text-xl font-semibold">{user?.fullName}</h5>
                      <h6 className="text-muted-foreground">@{user?.username}</h6>
                    </div>
                    <GamificationStats data={gamificationData} />
                  </div>
                )}
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
