import HeroImage from "@/assets/images/hero-image.jpg";

import { ExamList } from "../mocules/record-test/exam-list";
import { StreakSection } from "../organisms/streak";

export default function PracticePage() {
  return (
    <div className="grid grid-cols-12 gap-6 px-8">
      <div className="col-span-8 flex h-screen w-full flex-col justify-start gap-9 pt-8">
        <img src={HeroImage} alt="hero" className="rounded-2xl object-cover" />
        <ExamList />
      </div>
      <div className="col-span-4 pt-8">
        <StreakSection />
      </div>
    </div>
  );
}
