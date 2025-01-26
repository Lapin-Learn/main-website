import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export type TagsListProps = {
  tags: string[];
  format?: (tag: string) => string;
};

export default function TagsList({ tags, format }: TagsListProps) {
  const { t } = useTranslation("tooltip");

  return (
    <span className="inline-flex flex-wrap items-center gap-2 align-text-bottom">
      {tags.map((tag, index) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                key={index}
                className="h-fit text-nowrap rounded-md bg-blue-50 px-2.5 py-0.5 text-center text-[12px] font-medium text-blue-500"
              >
                {format ? format(tag) : tag}
              </span>
            </TooltipTrigger>
            <TooltipContent className="bg-white shadow-md" sideOffset={4}>
              <span className={cn("text-small font-semibold text-black")}>
                {t(`tagsList.${tag}`)}
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </span>
  );
}
