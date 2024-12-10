import { ExamList } from "../mocules/record-test/exam-list";
import HeroImage from "@/assets/images/hero-image.jpg";
import { StreakSection } from "../organisms/streak";
import { useSearch } from "@tanstack/react-router";

export default function PracticePage() {
  const { skill } = useSearch({ strict: false });
  console.log(skill);
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
