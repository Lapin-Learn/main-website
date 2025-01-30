import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { EnumSkill } from "@/lib/enums";
import {
  confirmLessonCompletion,
  getLessonQuestions,
  getLessons,
  getQuestionTypes,
} from "@/services/daily-lesson";
import { evaluateSpeaking } from "@/services/speaking";

import { useMilestoneStore } from "../zustand/use-milestone-store";
import { gamificationKeys } from "./useGamification";

const questionTypeKeys = {
  key: ["question-types"] as const,
  bySkill: (skill: EnumSkill) => [...questionTypeKeys.key, skill] as const,
  detail: (questionTypeId: string) => [...questionTypeKeys.key, questionTypeId] as const,
  lessonList: (questionTypeId: string) =>
    [...questionTypeKeys.detail(questionTypeId), "lessons"] as const,
  instruction: (questionTypeId: string) =>
    [...questionTypeKeys.detail(questionTypeId), "instruction"] as const,
};

const lessonKeys = {
  key: ["daily-lessons"] as const,
  detail: (lessonId: string) => [...lessonKeys.key, lessonId] as const,
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

export const useLessonQuestions = (lessonId: string) => {
  return useQuery({
    queryKey: lessonKeys.detail(lessonId),
    queryFn: () => getLessonQuestions(lessonId),
  });
};

export const useInstruction = (questionTypeId: string) => {
  return useQuery({
    queryKey: questionTypeKeys.instruction(questionTypeId),
    queryFn: () => getLessonQuestions(questionTypeId),
  });
};

export const useLessonCompletion = () => {
  const { setMilestones } = useMilestoneStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmLessonCompletion,
    onSuccess: ({ milestones }) => {
      setMilestones(milestones);
      queryClient.invalidateQueries({ queryKey: gamificationKeys.gamificationProfile });
      queryClient.invalidateQueries({ queryKey: questionTypeKeys.key });
    },
    onError: (error) => {
      console.error("Lesson completion mutation error:", error);
    },
  });
};

export const useSpeakingEvaluation = () => {
  return useMutation({
    mutationFn: evaluateSpeaking,
    onError: (error) => {
      console.error("Speaking evaluation mutation error:", error);
    },
  });
};
