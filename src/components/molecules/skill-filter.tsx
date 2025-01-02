import { Link, useLocation } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import AllSkillsIcon from "@/assets/icons/skills/all";
import { MAPPED_SKILL_ICON, MAPPED_SKILL_ICON_FILLED } from "@/lib/consts";
import { EnumSkill, ExtendEnumSkill } from "@/lib/enums";
import { cn } from "@/lib/utils";

import { Button } from "../ui";

const skillsList = [
  {
    label: ExtendEnumSkill.allSkills,
    IconOutlined: AllSkillsIcon,
    IconFilled: AllSkillsIcon,
  },
  ...Object.keys(MAPPED_SKILL_ICON).map((key) => ({
    label: key,
    IconOutlined: MAPPED_SKILL_ICON[key as EnumSkill],
    IconFilled: MAPPED_SKILL_ICON_FILLED[key as EnumSkill],
  })),
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
