import { createFileRoute } from "@tanstack/react-router";

import DailyLessonPage from "@/components/pages/[module]-daily-lesson";

export const Route = createFileRoute("/_authenticated/_dashboard/daily-lesson/")({
  component: DailyLessonPage,
});
