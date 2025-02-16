import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import DailyLessonContent from "@/components/pages/[module]-daily-lesson/daily-lesson-content";

const searchSchema = z.object({
  questionTypeId: z.string().or(z.number()).optional(),
});

export const Route = createFileRoute("/_authenticated/daily-lesson/$dailyLessonId")({
  component: DailyLessonContent,
  beforeLoad: async ({ params, search }) => {
    const { dailyLessonId } = params;
    const { questionTypeId } = search;
    if (!questionTypeId) {
      return redirect({ to: "/daily-lesson" });
    }
    return {
      dailyLessonId: dailyLessonId,
    };
  },
  validateSearch: searchSchema,
});
