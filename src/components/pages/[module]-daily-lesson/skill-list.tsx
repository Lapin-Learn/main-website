import { useState } from "react";
import { useTranslation } from "react-i18next";

import Listening from "@/assets/images/daily-lesson/listening.jpg";
import Reading from "@/assets/images/daily-lesson/reading.jpg";
import Speaking from "@/assets/images/daily-lesson/speaking.jpg";
import Writing from "@/assets/images/daily-lesson/writing.jpg";
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
    <main className="flex size-full flex-col gap-4">
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
      <div className="grid size-fit grid-cols-2 gap-4">
        {Object.keys(EnumSkill).map((skill) => (
          <div
            key={skill}
            className={cn(
              "w-full h-fit flex flex-col sm:flex-row justify-around items-center rounded-2xl overflow-hidden",
              dailyLessonSkillMapping[skill as EnumSkill].color,
              currentSkill === skill ? "opacity-100" : "opacity-60"
            )}
            onMouseDown={() => setCurrentSkill(skill as EnumSkill)}
          >
            <div className="w-fit basis-1/2 px-4 sm:px-11">
              <p className="text-heading-3 font-bold capitalize text-white">{skill}</p>
            </div>
            <div className="static h-48 w-full basis-1/2 bg-blue-500">
              <img
                src={dailyLessonSkillMapping[skill as EnumSkill].image}
                alt={skill}
                className="size-full object-top md:hidden"
                onLoad={(e) => (e.currentTarget.style.display = "block")}
                onError={(e) => (e.currentTarget.style.display = "none")}
                style={{ display: "none" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillListPage;
