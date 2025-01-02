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
import { ExtendEnumSkill } from "@/lib/enums";
import { cn } from "@/lib/utils";

import { Button } from "../ui";

const skillsList: {
  label: ExtendEnumSkill;
  IconOutlined: React.FC<React.SVGProps<SVGSVGElement>>;
  IconFilled: React.FC<React.SVGProps<SVGSVGElement>>;
}[] = [
  {
    label: ExtendEnumSkill.allSkills,
    IconOutlined: AllSkillsIcon,
    IconFilled: AllSkillsFilledIcon,
  },
  { label: ExtendEnumSkill.reading, IconOutlined: ReadingIcon, IconFilled: ReadingFilledIcon },
  {
    label: ExtendEnumSkill.listening,
    IconOutlined: ListeningIcon,
    IconFilled: ListeningFilledIcon,
  },
  { label: ExtendEnumSkill.writing, IconOutlined: WritingIcon, IconFilled: WritingFilledIcon },
  { label: ExtendEnumSkill.speaking, IconOutlined: SpeakingIcon, IconFilled: SpeakingFilledIcon },
];

const SkillsFilter = () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {skillsList.map(({ label, IconOutlined, IconFilled }) => (
        <Link
          key={label}
          to="/practice"
          search={{ skill: label !== ExtendEnumSkill.allSkills ? label : undefined }}
        >
          <Button
            variant="ghost"
            size="lg"
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-semibold transition-all",
              label === (search.skill || ExtendEnumSkill.allSkills)
                ? "bg-[#FCE3B4] text-orange-700 hover:bg-[#FCE3B4]/80 hover:text-orange-700"
                : "bg-neutral-50 text-gray-700 hover:bg-neutral-100/50 hover:text-gray-800"
            )}
          >
            {label === (search.skill || ExtendEnumSkill.allSkills) ? (
              <IconFilled className={cn("size-4")} fill="#c2410c" />
            ) : (
              <IconOutlined className={cn("size-4")} fill="#374151" />
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
