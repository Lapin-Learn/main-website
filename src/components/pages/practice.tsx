import { useTranslation } from "react-i18next";

import { useUserProfile } from "@/hooks/react-query/useUsers";

import { CollectionList } from "../organisms/collection-list";
import DashboardLayout from "../templates/dashboard-layout";

const getTime = (hour: number) => (hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening");

function Banner() {
  const { data: profile } = useUserProfile();
  const { t } = useTranslation("practice");

  return (
    <div className="relative flex w-full items-end rounded-lg bg-[#e2f2ff] p-3 md:rounded-2xl md:px-6">
      <div className="absolute z-20 flex w-2/3 flex-col gap-1 md:pb-4">
        <div className="font-manrope text-base font-extrabold capitalize text-blue-800 md:text-2xl">
          {t(`banner.title.${getTime(new Date().getHours())}`, { name: profile?.fullName })}
        </div>
        <div className="text-xs font-normal text-blue-700 md:text-small">
          {t("banner.greetings")}
        </div>
      </div>
      <img
        src="/assets/practice-banner-dash-line.svg"
        alt="practice-banner-dash-line"
        className="absolute right-0 top-0 h-14 md:h-28"
      />
      <img
        src="/assets/practice-banner-book.svg"
        alt="practice-banner-book"
        className="z-10 -mr-8 ml-auto h-24 md:-mr-6 md:h-40"
      />
    </div>
  );
}

export default function PracticePage() {
  return (
    <DashboardLayout banner={<Banner />}>
      <CollectionList />
    </DashboardLayout>
  );
}
