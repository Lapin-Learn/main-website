import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Listening from "@/assets/images/daily-lesson/listening.svg";
import Reading from "@/assets/images/daily-lesson/reading.svg";
import Speaking from "@/assets/images/daily-lesson/speaking.svg";
import Writing from "@/assets/images/daily-lesson/writing.svg";
import DashboardLayout from "@/components/templates/dashboard-layout";
import { EnumSkill } from "@/lib/enums";
import { cn } from "@/lib/utils";

import QuestionTypeList from "./question-type-list";

const dailyLessonSkillMapping = {
  [EnumSkill.reading]: {
    image: Reading,
    color: "bg-[#BAE0BA]",
    text: "text-[#326032]",
  },
  [EnumSkill.listening]: {
    image: Listening,
    color: "bg-[#DCDAEF]",
    text: "text-[#424296]",
  },
  [EnumSkill.writing]: {
    image: Writing,
    color: "bg-[#F9F1D7]",
    text: "text-[#8E5F20]",
  },
  [EnumSkill.speaking]: {
    image: Speaking,
    color: "bg-[#CCF1FF]",
    text: "text-[#05AEE2]",
  },
};

export default function DailyLessonPage() {
  const { t } = useTranslation("dailyLesson");
  const [currentSkill, setCurrentSkill] = useState<EnumSkill>(EnumSkill.reading);
  return (
    <DashboardLayout>
      <main className="flex size-full flex-col space-y-8">
        <p className="text-left text-heading-4 font-semibold">{t("title")}</p>
        <SkillGrid currentSkill={currentSkill} setCurrentSkill={setCurrentSkill} />
        <QuestionTypeList skill={currentSkill} />
      </main>
    </DashboardLayout>
  );
}

const SkillGrid = ({
  currentSkill,
  setCurrentSkill,
}: {
  currentSkill: EnumSkill;
  setCurrentSkill: (skill: EnumSkill) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div className="flex items-center justify-center">
      <div className="grid w-full grid-cols-2 gap-2 md:gap-4">
        {Object.keys(EnumSkill).map((skill, idx) => (
          <button
            key={skill}
            className={cn("relative group w-full col-span-1 transition-opacity duration-200 p-1")}
            onClick={() => setCurrentSkill(skill as EnumSkill)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={cn(
                "w-full grid grid-cols-2 place-content-stretch place-items-stretch z-20 overflow-hidden rounded-2xl",
                dailyLessonSkillMapping[skill as EnumSkill].color,
                currentSkill === skill ? "opacity-100" : "hover:opacity-100 opacity-60"
              )}
            >
              <div className="flex w-full flex-row items-center justify-center">
                <p
                  className={cn(
                    "grow text-base font-bold capitalize md:text-heading-5 lg:text-heading-3",
                    dailyLessonSkillMapping[skill as EnumSkill].text
                  )}
                >
                  {skill}
                </p>
              </div>
              <div className="h-full">
                <img
                  src={dailyLessonSkillMapping[skill as EnumSkill].image}
                  alt={skill}
                  className="object-cover md:hidden"
                  onLoad={(e) => (e.currentTarget.style.display = "block")}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className={cn(
                    "absolute inset-0 h-full w-full dark:bg-slate-800/[0.8] block rounded-2xl -z-10",
                    // "bg-blue-500"
                    `${dailyLessonSkillMapping[skill as EnumSkill].color}`
                  )}
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </div>
  );
};
