import { useState } from "react";
import { useTranslation } from "react-i18next";

import Listening from "@/assets/images/daily-lesson/listening.webp";
import Reading from "@/assets/images/daily-lesson/reading.webp";
import Speaking from "@/assets/images/daily-lesson/speaking.webp";
import Writing from "@/assets/images/daily-lesson/writing.webp";
import { EnumSkill } from "@/lib/enums";
import { cn } from "@/lib/utils";

import QuestionTypeList from "./question-type-list";

const dailyLessonSkillMapping = {
  [EnumSkill.reading]: {
    image: Reading,
    color: "bg-[#8EB2AC]",
  },
  [EnumSkill.listening]: {
    image: Listening,
    color: "bg-[#98BFA4]",
  },
  [EnumSkill.writing]: {
    image: Writing,
    color: "bg-[#EEB572]",
  },
  [EnumSkill.speaking]: {
    image: Speaking,
    color: "bg-[#76AC8D]",
  },
};

const SkillListPage = () => {
  const { t } = useTranslation("dailyLesson");
  const [currentSkill, setCurrentSkill] = useState<EnumSkill>(EnumSkill.reading);
  return (
    <main className="flex size-full flex-col space-y-8">
      <p className="text-left text-heading-4 font-semibold">{t("title")}</p>
      <SkillGrid currentSkill={currentSkill} setCurrentSkill={setCurrentSkill} />
      <QuestionTypeList skill={currentSkill} />
    </main>
  );
};

const SkillGrid = ({
  currentSkill,
  setCurrentSkill,
}: {
  currentSkill: EnumSkill;
  setCurrentSkill: (skill: EnumSkill) => void;
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid w-full grid-cols-4 gap-2 md:gap-4">
        {Object.keys(EnumSkill).map((skill) => (
          <button
            key={skill}
            className={cn(
              "w-full col-span-2 grid grid-cols-subgrid justify-around items-center rounded-2xl overflow-hidden transition-opacity duration-200",
              dailyLessonSkillMapping[skill as EnumSkill].color,
              currentSkill === skill ? "opacity-100" : "hover:opacity-100 opacity-60"
            )}
            onClick={() => setCurrentSkill(skill as EnumSkill)}
          >
            <div className="flex w-full flex-row items-center justify-center">
              <p className="text-base font-bold capitalize text-white md:text-heading-5 lg:text-heading-3">
                {skill}
              </p>
            </div>
            <div className="h-full">
              <img
                src={dailyLessonSkillMapping[skill as EnumSkill].image}
                alt={skill}
                className="size-full object-contain md:hidden"
                onLoad={(e) => (e.currentTarget.style.display = "block")}
                onError={(e) => (e.currentTarget.style.display = "none")}
                style={{ display: "none" }}
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillListPage;
