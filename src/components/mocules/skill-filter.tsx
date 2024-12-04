import { Dispatch, SetStateAction } from "react";
import ListeningIcon from "@/assets/icons/skills/listening";
import ReadingIcon from "@/assets/icons/skills/reading";
import SpeakingIcon from "@/assets/icons/skills/speaking";
import WritingIcon from "@/assets/icons/skills/writing";
import AllSkillsIcon from "@/assets/icons/skills/all";
import { cn } from "@/lib/utils";
import { Button } from "../ui";

export type Skills = "Tất cả kỹ năng" | "Reading" | "Listening" | "Writing" | "Speaking";

const skillsList: { label: Skills; Icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
  { label: "Tất cả kỹ năng", Icon: AllSkillsIcon },
  { label: "Reading", Icon: ReadingIcon },
  { label: "Listening", Icon: ListeningIcon },
  { label: "Writing", Icon: WritingIcon },
  { label: "Speaking", Icon: SpeakingIcon },
];

const SkillsFilter = ({
  skill,
  setSkill,
}: {
  skill: Skills;
  setSkill: Dispatch<SetStateAction<Skills>>;
}) => {
  return (
    <div className="flex gap-4">
      {skillsList.map(({ label, Icon }) => (
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
          <Icon className={cn("h-5 w-5")} fill={label === skill ? "#c2410c" : "#374151"} />
          <span className="hidden md:inline">{label}</span>
        </Button>
      ))}
    </div>
  );
};

export default SkillsFilter;
