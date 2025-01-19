import { createFileRoute } from "@tanstack/react-router";

import QuestionTypeDetailPage from "@/components/pages/[module]-daily-lesson/question-type-detail";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/daily-lesson/question-types/$questionTypeId"
)({
  component: QuestionTypeDetailPage,
});
