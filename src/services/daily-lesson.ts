import { QueryFunctionContext } from "@tanstack/react-query";

import { EnumSkill } from "@/lib/enums";
import { DLQuestion, FetchingData } from "@/lib/types";
import {
  DailyLesson,
  Instruction,
  LessonResult,
  QuestionType,
  QuestionTypeProgress,
  SpeakingServiceResponse,
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
export const getLessons = async ({ queryKey }: QueryFunctionContext<string[]>) => {
  const [, questionTypeId, bandScore] = queryKey;

  return (
    await api
      .get(`daily-lessons/question-types/${questionTypeId}/lessons`, {
        searchParams: { band: bandScore },
      })
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
      .get(`daily-lessons/${lessonId}/questions`)
      .json<FetchingData<LessonQuestionsResponse>>()
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
    await api.post<FetchingData<LessonResult>>(`daily-lessons/completion`, { json: payload }).json()
  ).data;
};

export const getInstruction = async (questionTypeId: string) => {
  return (
    await api
      .get(`daily-lessons/question-types/${questionTypeId}/instruction`)
      .json<FetchingData<Instruction>>()
  ).data;
};

type SpeakingEvaluation = {
  original: string;
  uri: string;
};

export const evaluateSpeaking = async (params: SpeakingEvaluation) => {
  try {
    const formData = new FormData();
    formData.append("file", {
      uri: params.uri,
      name: "recording.wav",
      type: "audio/wav",
    } as unknown as Blob);
    formData.append("original", params.original);

    const response = (
      await api
        .post<FetchingData<SpeakingServiceResponse>>(`api/ai/speech-evaluation`, {
          body: formData,
        })
        .json()
    ).data;
    return response;
  } catch (error) {
    console.error("Error evaluating speaking:", error);
    throw error;
  }
};
