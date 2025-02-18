import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import Listening from "@/assets/images/daily-lesson/listening.svg";
import Reading from "@/assets/images/daily-lesson/reading.svg";
import Speaking from "@/assets/images/daily-lesson/speaking.svg";
import Writing from "@/assets/images/daily-lesson/writing.svg";
import { EnumSkill } from "@/lib/enums";
import { cn } from "@/lib/utils";

const dailyLessonSkillMapping = {
  [EnumSkill.reading]: {
    image: Reading,
    color: "bg-[#BAE0BA]",
    hoverColor: "bg-[#BAE0BA70]",
    text: "text-[#326032]",
  },
  [EnumSkill.listening]: {
    image: Listening,
    color: "bg-[#DCDAEF]",
    hoverColor: "bg-[#DCDAEF70]",
    text: "text-[#424296]",
  },
  [EnumSkill.writing]: {
    image: Writing,
    color: "bg-[#F9F1D7]",
    hoverColor: "bg-[#F9F1D770]",
    text: "text-[#8E5F20]",
  },
  [EnumSkill.speaking]: {
    image: Speaking,
    color: "bg-[#CCF1FF]",
    hoverColor: "bg-[#CCF1FF70]",
    text: "text-[#05AEE2]",
  },
};

type SkillGridProps = {
  currentSkill: EnumSkill;
  setCurrentSkill: (skill: EnumSkill) => void;
};

const SkillGrid = ({ currentSkill, setCurrentSkill }: SkillGridProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="-m-3 grid w-full grid-cols-2 gap-2">
      {Object.keys(EnumSkill).map((skill, idx) => (
        <div className="relative p-3">
          <button
            key={skill}
            className={cn("relative group w-full col-span-1 transition-all duration-200")}
            onClick={() => setCurrentSkill(skill as EnumSkill)}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={cn(
                "grid grid-cols-2 place-content-stretch place-items-stretch z-20 overflow-hidden rounded-2xl hover:opacity-100 hover:saturate-100",
                dailyLessonSkillMapping[skill as EnumSkill].color,
                currentSkill !== skill && "saturate-[0.6] opacity-60"
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
          </button>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className={cn(
                  "absolute inset-0 h-full w-full dark:bg-slate-800/[0.8] block rounded-2xl -z-10",
                  `${dailyLessonSkillMapping[skill as EnumSkill].hoverColor}`
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
        </div>
      ))}
    </div>
  );
};

export default SkillGrid;
