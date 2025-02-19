import { SubscriptionRedirectDialog } from "@components/molecules/subscription-redirect-dialog.tsx";
import { useTranslation } from "react-i18next";

import Illus from "@/assets/shop-banner-illus.svg";
import { ShopList } from "@/components/organisms/shop/shop-list";
import { ActivateItemDialogProvider } from "@/components/organisms/use-item-dialog";
import { UseItemDialog } from "@/components/organisms/use-item-dialog/dialog";
import DashboardLayout from "@/components/templates/dashboard-layout";
import { Route } from "@/routes/_authenticated/_dashboard/shop";

function Banner() {
  const { t } = useTranslation("shop");
  return (
    <div className="flex w-full items-end justify-between rounded-2xl bg-[#FDF2E1] px-4 pb-4 pt-3 md:px-6">
      <div className=" flex flex-col gap-1 pb-4">
        <div className="font-manrope text-xl font-extrabold text-blue-800 md:text-2xl">
          {t("shop.title")}
        </div>
        <div className="text-xs font-normal text-blue-700 md:text-small">{t("shop.greetings")}</div>
      </div>
      <img src={Illus} alt="shop-banner-illus" className="h-36 pl-5 md:h-40 md:pl-10" />
    </div>
  );
}

export default function ShopPage() {
  const { status, orderCode } = Route.useSearch();

  return (
    <DashboardLayout banner={<Banner />}>
      <ActivateItemDialogProvider>
        <ShopList />
        <UseItemDialog />
        <SubscriptionRedirectDialog status={status} orderCode={orderCode} />
      </ActivateItemDialogProvider>
    </DashboardLayout>
  );
}
