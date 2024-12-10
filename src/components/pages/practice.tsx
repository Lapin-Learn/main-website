import HeroImage from "@/assets/images/hero-image.jpg";

import { CollectionList } from "../organisms/simulated-tests/collection-list";
import { StreakSection } from "../organisms/streak";
import SelectModeDialog from "../organisms/select-mode-dialog";
import { useTranslation } from "react-i18next";
import { isDevEnv } from "@/lib/utils";

export default function PracticePage() {
  const skill = "reading";
  const title = "Road to IELTS - Listening Test 1";
  const { t } = useTranslation("practice");

  // Temporary function to generate parts
  function generateParts(skill: string) {
    switch (skill) {
      case "reading":
        return [
          { value: "passage_1", label: t("skills.reading.passage", { number: 1 }) },
          { value: "passage_2", label: t("skills.reading.passage", { number: 2 }) },
          { value: "passage_3", label: t("skills.reading.passage", { number: 3 }) },
        ];
      case "listening":
        return [
          { value: "section_1", label: t("skills.listening.section", { number: 1 }) },
          { value: "section_2", label: t("skills.listening.section", { number: 2 }) },
          { value: "section_3", label: t("skills.listening.section", { number: 3 }) },
          { value: "section_4", label: t("skills.listening.section", { number: 4 }) },
        ];
      case "writing":
        return [
          { value: "task_1", label: t("skills.writing.task", { number: 1 }) },
          { value: "task_2", label: t("skills.writing.task", { number: 2 }) },
        ];
      case "speaking":
        return [
          { value: "part_1", label: t("skills.speaking.part", { number: 1 }) },
          { value: "part_2", label: t("skills.speaking.part", { number: 2 }) },
          { value: "part_3", label: t("skills.speaking.part", { number: 3 }) },
        ];
      default:
        return [];
    }
  }

  return (
    <div className="flex flex-col-reverse px-8 md:grid md:grid-cols-12 md:gap-6">
      <div className="col-span-8 flex h-screen w-full flex-col justify-start gap-9 pt-8">
        <img src={HeroImage} alt="hero" className="rounded-2xl object-cover" />
        <CollectionList />
        {isDevEnv() && <SelectModeDialog title={title} parts={generateParts(skill)} />}
      </div>
      <div className="col-span-4 pt-8">
        <StreakSection />
      </div>
    </div>
  );
}
