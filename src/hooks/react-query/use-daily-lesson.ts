import { useQuery } from "@tanstack/react-query";

import { EnumSkill } from "@/lib/enums";
import { getLessons, getQuestionTypes } from "@/services/daily-lesson";

const questionTypeKeys = {
  key: ["question-types"] as const,
  bySkill: (skill: EnumSkill) => [...questionTypeKeys.key, skill] as const,
  lessonList: (questionTypeId: string) =>
    [...questionTypeKeys.key, questionTypeId, "lessons"] as const,
};

export const useGetQuestionTypes = (skill: EnumSkill) => {
  return useQuery({
    queryKey: questionTypeKeys.bySkill(skill),
    queryFn: () => getQuestionTypes(skill),
    staleTime: Infinity,
  });
};

export const useGetLessonList = (questionTypeId: string) => {
  return useQuery({
    queryKey: questionTypeKeys.lessonList(questionTypeId),
    queryFn: () => getLessons(questionTypeId),
    staleTime: Infinity,
  });
};
