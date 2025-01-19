import { createFileRoute } from "@tanstack/react-router";

import DailyLessonContent from "@/components/pages/[module]-daily-lesson/daily-lesson-content";

export const Route = createFileRoute("/_authenticated/_dashboard/daily-lesson/$dailyLessonId")({
  component: DailyLessonContent,
});
