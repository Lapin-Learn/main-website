import { useLocation, useNavigate } from "@tanstack/react-router";
import { FC, SVGProps } from "react";
import { useTranslation } from "react-i18next";

import { ALL_SKILLS_LIST } from "@/lib/consts";
import { EnumSkill, ExtendEnumSkill } from "@/lib/enums";
import { cn } from "@/lib/utils";

import { Button } from "../ui";

const SkillsFilter = ({
  skillsList = ALL_SKILLS_LIST,
  selected,
  setSelected,
}: {
  skillsList?: {
    label: EnumSkill | ExtendEnumSkill;
    IconOutlined: FC<SVGProps<SVGSVGElement>>;
    IconFilled: FC<SVGProps<SVGSVGElement>>;
  }[];
  selected?: string;
  setSelected?: (selected: EnumSkill) => void;
}) => {
  const { t } = useTranslation();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {skillsList.map(({ label, IconOutlined, IconFilled }) => (
        <Button
          key={label}
          variant="ghost"
          size="lg"
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-semibold transition-all",
            label === (search.skill || selected)
              ? "bg-[#FCE3B4] text-orange-700 hover:bg-[#FCE3B4]/80 hover:text-orange-700"
              : "bg-neutral-50 text-gray-700 hover:bg-neutral-100/50 hover:text-gray-800"
          )}
          onClick={() =>
            !selected
              ? navigate({
                  to: pathname,
                  search: { skill: label !== ExtendEnumSkill.allSkills ? label : undefined },
                })
              : setSelected?.(label as EnumSkill)
          }
        >
          {label === (search.skill || selected) ? (
            <IconFilled className={cn("size-4")} fill="#c2410c" />
          ) : (
            <IconOutlined className={cn("size-4")} fill="#374151" />
          )}
          <span className="md:inline">{t(label).charAt(0).toUpperCase() + t(label).slice(1)}</span>
        </Button>
      ))}
    </div>
  );
};

export default SkillsFilter;
