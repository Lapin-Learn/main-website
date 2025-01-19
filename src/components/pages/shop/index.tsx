import HeroImageShop from "@/assets/images/hero-image-shop.webp";
import { ShopList } from "@/components/organisms/shop/shop-list";
import DashboardLayout from "@/components/templates/dashboard-layout";

export default function ShopPage() {
  return (
    <DashboardLayout heroImage={HeroImageShop}>
      <ShopList />
    </DashboardLayout>
  );
}
