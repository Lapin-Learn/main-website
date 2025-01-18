import HeroImageShop from "@/assets/images/hero-image-shop.jpg";
import { ItemList } from "@/components/organisms/item/item-list";
import DashboardLayout from "@/components/templates/dashboard-layout";

export default function ShopPage() {
  return (
    <DashboardLayout heroImage={HeroImageShop}>
      <ItemList />
    </DashboardLayout>
  );
}
