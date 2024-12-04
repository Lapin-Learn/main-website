import { ExamList } from "../mocules/record-test/exam-list";
import HeroImage from "@/assets/images/hero-image.jpg";

export default function PracticePage() {
  return (
    <div className="grid grid-cols-12 gap-16">
      <div className="col-span-8 flex h-screen w-full flex-col justify-start gap-9 p-8">
        <img src={HeroImage} alt="hero" className="rounded-2xl object-cover" />
        <ExamList />
      </div>
      <div className="col-span-4">other component</div>
    </div>
  );
}
