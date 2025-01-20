import { EnumSkill } from "@/lib/enums";
import { DLQuestion, FetchingData } from "@/lib/types";
import {
  DailyLesson,
  Instruction,
  LessonResult,
  QuestionType,
  QuestionTypeProgress,
} from "@/lib/types/daily-lesson.type";
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

type LessonQuestionsResponse = {
  id: number;
  name: string;
  order: number;
  questionToLessons: {
    order: number;
    question: DLQuestion;
    questionId: string;
  }[];
};

export const getLessonQuestions = async (lessonId: string) => {
  return (
    await api
      .get<FetchingData<LessonQuestionsResponse>>(`/daily-lessons/lessons/${lessonId}/questions`)
      .json()
  ).data;
};

type LessonCompletionPayload = {
  lessonId: number;
  correctAnswers: number;
  wrongAnswers: number;
  duration: number;
};
export const confirmLessonCompletion = async (payload: LessonCompletionPayload) => {
  return (
    await api.post<FetchingData<LessonResult>>(`/lessons/completion`, { json: payload }).json()
  ).data;
};

export const getInstruction = async (questionTypeId: string) => {
  return (
    await api
      .get<FetchingData<Instruction>>(`/daily-lessons/question-types/${questionTypeId}/instruction`)
      .json()
  ).data;
};
