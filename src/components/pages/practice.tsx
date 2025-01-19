import HeroImage from "@/assets/images/hero-image.webp";

import { CollectionList } from "../organisms/collection-list";
import DashboardLayout from "../templates/dashboard-layout";

export default function PracticePage() {
  return (
    <DashboardLayout heroImage={HeroImage}>
      <CollectionList />
    </DashboardLayout>
  );
}
