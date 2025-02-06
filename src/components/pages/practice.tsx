import { useTranslation } from "react-i18next";

import Book from "@/assets/practice-banner-book.svg";
import DashLine from "@/assets/practice-banner-dash-line.svg";
import { useUserProfile } from "@/hooks/react-query/useUsers";

import { CollectionList } from "../organisms/collection-list";
import DashboardLayout from "../templates/dashboard-layout";

function Banner() {
  const { data: profile } = useUserProfile();
  const { t } = useTranslation("practice");

  return (
    <div className="relative flex w-full items-end rounded-2xl bg-blue-50 px-4 py-2 md:px-6">
      <div className="absolute z-20 flex w-2/3 flex-col gap-1 md:pb-4">
        <div className="font-manrope text-lg font-extrabold capitalize text-[#0B0084] md:text-2xl">
          {t("banner.title", { name: profile?.username })}
        </div>
        <div className="text-xs font-normal text-blue-700 md:text-small">
          {t("banner.greetings")}
        </div>
      </div>
      <img
        src={DashLine}
        alt="practice-banner-illus"
        className="absolute right-0 top-0 h-16 md:h-28"
      />
      <img
        src={Book}
        alt="practice-banner-illus"
        className="z-10 -mr-8 ml-auto h-28 md:-mr-6 md:h-40"
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
