import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import AllSkillsIcon from "@/assets/icons/skills/all";
import AllSkillsFilledIcon from "@/assets/icons/skills/all-filled";
import ListeningIcon from "@/assets/icons/skills/listening";
import ListeningFilledIcon from "@/assets/icons/skills/listening-filled";
import ReadingIcon from "@/assets/icons/skills/reading";
import ReadingFilledIcon from "@/assets/icons/skills/reading-filled";
import SpeakingIcon from "@/assets/icons/skills/speaking";
import SpeakingFilledIcon from "@/assets/icons/skills/speaking-filled";
import WritingIcon from "@/assets/icons/skills/writing";
import WritingFilledIcon from "@/assets/icons/skills/writing-filled";
import { EnumSkill } from "@/lib/enums";
import { cn } from "@/lib/utils";

import { Button } from "../ui";

const skillsList: {
  label: EnumSkill;
  IconOutlined: React.FC<React.SVGProps<SVGSVGElement>>;
  IconFilled: React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  { label: EnumSkill.allSkills, IconOutlined: AllSkillsIcon, IconFilled: AllSkillsFilledIcon },
  { label: EnumSkill.reading, IconOutlined: ReadingIcon, IconFilled: ReadingFilledIcon },
  { label: EnumSkill.listening, IconOutlined: ListeningIcon, IconFilled: ListeningFilledIcon },
  { label: EnumSkill.writing, IconOutlined: WritingIcon, IconFilled: WritingFilledIcon },
  { label: EnumSkill.speaking, IconOutlined: SpeakingIcon, IconFilled: SpeakingFilledIcon },
];

const SkillsFilter = () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {skillsList.map(({ label, IconOutlined, IconFilled }) => (
        <Link to="/practice" search={{ skill: label !== EnumSkill.allSkills ? label : undefined }}>
          <Button
            key={label}
            variant="ghost"
            size="lg"
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-semibold transition-all",
              label === (search.skill || EnumSkill.allSkills)
                ? "bg-[#FCE3B4] text-orange-700 hover:bg-[#FCE3B4]/80 hover:text-orange-700"
                : "bg-neutral-50 text-gray-700 hover:bg-neutral-100/50 hover:text-gray-800"
            )}
          >
            {label === (search.skill || EnumSkill.allSkills) ? (
              <IconFilled className={cn("h-5 w-5")} fill="#c2410c" />
            ) : (
              <IconOutlined className={cn("h-5 w-5")} fill="#374151" />
            )}
            <span className="md:inline">
              {t(label).charAt(0).toUpperCase() + t(label).slice(1)}
            </span>
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default SkillsFilter;
