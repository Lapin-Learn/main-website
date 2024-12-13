import HeroImage from "@/assets/images/hero-image.jpg";

import { CollectionList } from "../organisms/simulated-tests/collection-list";
import { StreakSection } from "../organisms/streak";

export default function PracticePage() {
  return (
    <div className="flex flex-col-reverse px-8 md:grid md:grid-cols-12 md:gap-6">
      <div className="col-span-8 flex h-screen w-full flex-col justify-start gap-9 pt-8">
        <img src={HeroImage} alt="hero" className="rounded-2xl object-cover" />
        <CollectionList />
      </div>
      <div className="col-span-4 pt-8">
        <StreakSection />
      </div>
    </div>
  );
}
