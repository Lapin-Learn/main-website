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
    label: "transactions",
    to: "/profile/transactions",
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
    <div className="col-span-3 p-0 md:p-8">
      <h1 className="mb-4 hidden text-heading-5 font-semibold md:mb-6 md:block md:text-2xl">
        {t("pageTitle")}
      </h1>
      <div className="min-h-screen overflow-hidden bg-white pb-8 max-md:relative md:min-h-[80vh] md:rounded-3xl">
        <img
          className="h-20 w-full object-cover max-md:absolute md:h-40"
          src="https://images.unsplash.com/photo-1513077202514-c511b41bd4c7?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="grid gap-4 px-4 pt-2 md:grid-cols-4 md:gap-8 md:px-8 md:pt-4 ">
          <ProfileTab items={profileTabItems} />
          <div className="w-full pt-4 max-md:overflow-x-hidden md:relative md:col-span-3 md:pt-16">
            <div className="flex w-full flex-col items-center gap-2 md:absolute md:top-0 md:-mt-4 md:-translate-y-1/2 md:flex-row md:items-end md:gap-4">
              <Avatar />
              <div className="flex flex-1 grow flex-col md:flex-row">
                {isLoading ? (
                  <>
                    <Skeleton className="mb-2 h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
                    <div className="flex flex-col items-center md:items-start">
                      <h5 className="text-lg font-semibold md:text-xl">{user?.fullName}</h5>
                      <h6 className="text-sm text-muted-foreground md:text-base">
                        @{user?.username}
                      </h6>
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
