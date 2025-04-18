import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { EnumBandScore, EnumSkill } from "@/lib/enums";
import {
  confirmLessonCompletion,
  evaluateSpeaking,
  getJumpBandQuestions,
  getLessonQuestions,
  getLessons,
  getQuestionTypes,
} from "@/services/daily-lesson";

import { useMilestoneStore } from "../zustand/use-milestone-store";
import { gamificationKeys } from "./useGamification";

const questionTypeKeys = {
  key: ["question-types"] as const,
  bySkill: (skill: EnumSkill) => [...questionTypeKeys.key, skill] as const,
  detail: (questionTypeId: string, bandScore: string) =>
    [...questionTypeKeys.key, questionTypeId, bandScore] as const,
  lessonList: (questionTypeId: string, bandScore: string) =>
    [...questionTypeKeys.detail(questionTypeId, bandScore), "lessons"] as const,
  instruction: (questionTypeId: string, bandScore: string) =>
    [...questionTypeKeys.detail(questionTypeId, bandScore), "instruction"] as const,
  jumpBand: (questionTypeId: string | number) =>
    [...questionTypeKeys.key, questionTypeId, "jump-band"] as const,
};

const lessonKeys = {
  key: ["daily-lessons"] as const,
  detail: (lessonId: string) => [...lessonKeys.key, lessonId] as const,
};

export const useGetQuestionTypes = (skill: EnumSkill) => {
  const { data, ...rest } = useQuery({
    queryKey: questionTypeKeys.bySkill(skill),
    queryFn: () => getQuestionTypes(skill),
    staleTime: Infinity,
  });
  return { data: data ? data.filter((item) => item.lessons) : data, ...rest };
};

export const useGetLessonList = ({
  questionTypeId,
  bandScore,
  enabled,
}: {
  questionTypeId: string;
  bandScore: EnumBandScore;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: questionTypeKeys.lessonList(questionTypeId, bandScore).slice(),
    queryFn: getLessons,
    enabled: enabled && !!questionTypeId,
  });
};

export const useLessonQuestions = (lessonId: string) => {
  return useQuery({
    queryKey: lessonKeys.detail(lessonId),
    queryFn: () => getLessonQuestions(lessonId),
  });
};

export const useJumpBandQuestions = ({ questionTypeId }: { questionTypeId: string | number }) => {
  return useQuery({
    queryKey: questionTypeKeys.jumpBand(questionTypeId),
    queryFn: () => getJumpBandQuestions(questionTypeId),
    staleTime: 0,
    enabled: !!questionTypeId,
  });
};

export const useInstruction = (questionTypeId: string, bandScore: string) => {
  return useQuery({
    queryKey: questionTypeKeys.instruction(questionTypeId, bandScore),
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
