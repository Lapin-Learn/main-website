import ListeningIcon from "@/assets/icons/skills/listening";
import ReadingIcon from "@/assets/icons/skills/reading";
import SpeakingIcon from "@/assets/icons/skills/speaking";
import WritingIcon from "@/assets/icons/skills/writing";
import { EnumSkill } from "@/lib/enums";

export const skillIconMap: Record<EnumSkill, React.FC<React.SVGProps<SVGSVGElement>>> = {
  [EnumSkill.allSkills]: ReadingIcon,
  [EnumSkill.reading]: ReadingIcon,
  [EnumSkill.listening]: ListeningIcon,
  [EnumSkill.writing]: WritingIcon,
  [EnumSkill.speaking]: SpeakingIcon,
};
