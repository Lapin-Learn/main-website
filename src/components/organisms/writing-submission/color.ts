import { EnumWritingCriteria } from "@/lib/enums.ts";

const MAPPED_CRITERIA_COLOR: Record<string, string> = {
  [EnumWritingCriteria.TaskAchievement]: "bg-[#E0BF6B]",
  [EnumWritingCriteria.LexicalResource]: "bg-[#A36BE0]",
  [EnumWritingCriteria.CoherenceAndCohesion]: "bg-[#E06B6D]",
  [EnumWritingCriteria.GrammaticalRangeAndAccuracy]: "bg-[#6BD0E0]",
};

export { MAPPED_CRITERIA_COLOR };
