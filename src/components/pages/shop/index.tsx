import { SubscriptionRedirectDialog } from "@components/molecules/subscription-redirect-dialog.tsx";

import HeroImageShop from "@/assets/images/hero-image-shop.webp";
import { ShopList } from "@/components/organisms/shop/shop-list";
import DashboardLayout from "@/components/templates/dashboard-layout";
import { Route } from "@/routes/_authenticated/_dashboard/shop";

export default function ShopPage() {
  const { status, orderCode } = Route.useSearch();

  return (
    <DashboardLayout heroImage={HeroImageShop}>
      <ShopList />
      <SubscriptionRedirectDialog status={status} orderCode={orderCode} />
    </DashboardLayout>
  );
}
