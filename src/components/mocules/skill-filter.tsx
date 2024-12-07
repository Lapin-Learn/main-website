import { Dispatch, SetStateAction } from "react";
import ListeningIcon from "@/assets/icons/skills/listening";
import ReadingIcon from "@/assets/icons/skills/reading";
import SpeakingIcon from "@/assets/icons/skills/speaking";
import WritingIcon from "@/assets/icons/skills/writing";
import AllSkillsIcon from "@/assets/icons/skills/all";
import ListeningFilledIcon from "@/assets/icons/skills/listening-filled";
import ReadingFilledIcon from "@/assets/icons/skills/reading-filled";
import SpeakingFilledIcon from "@/assets/icons/skills/speaking-filled";
import WritingFilledIcon from "@/assets/icons/skills/writing-filled";
import AllSkillsFilledIcon from "@/assets/icons/skills/all-filled";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { useTranslation } from "react-i18next";
import { EnumSkill } from "@/lib/enums";

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

const SkillsFilter = ({
  skill,
  setSkill,
}: {
  skill: EnumSkill;
  setSkill: Dispatch<SetStateAction<EnumSkill>>;
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex gap-4">
      {skillsList.map(({ label, IconOutlined, IconFilled }) => (
        <Button
          key={label}
          variant="ghost"
          size="lg"
          onClick={() => setSkill(label)}
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-semibold transition-all",
            label === skill
              ? "bg-[#FCE3B4] text-orange-700 hover:bg-[#FCE3B4]/80 hover:text-orange-700"
              : "bg-neutral-50 text-gray-700 hover:bg-neutral-100/50 hover:text-gray-800"
          )}
        >
          {label === skill ? (
            <IconFilled className={cn("h-5 w-5")} fill="#c2410c" />
          ) : (
            <IconOutlined className={cn("h-5 w-5")} fill="#374151" />
          )}
          <span className="hidden md:inline">
            {t(label).charAt(0).toUpperCase() + t(label).slice(1)}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default SkillsFilter;
