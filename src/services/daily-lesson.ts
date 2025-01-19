import { EnumSkill } from "@/lib/enums";
import { FetchingData } from "@/lib/types";
import { DailyLesson, QuestionType, QuestionTypeProgress } from "@/lib/types/daily-lesson.type";
import { generateSearchParams } from "@/lib/utils";

import api from "./kyInstance";

export const getQuestionTypes = async (skill: EnumSkill) => {
  const searchParams = generateSearchParams({ skill });
  return (
    await api
      .get("daily-lessons/question-types", { searchParams })
      .json<FetchingData<(QuestionType & { progress: QuestionTypeProgress })[]>>()
  ).data;
};

export type LessonList = {
  lessons: DailyLesson[];
  totalLearningDuration: number;
};
export const getLessons = async (questionTypeId: string) => {
  return (
    await api
      .get(`daily-lessons/question-types/${questionTypeId}/lessons`)
      .json<FetchingData<LessonList>>()
  ).data;
};
