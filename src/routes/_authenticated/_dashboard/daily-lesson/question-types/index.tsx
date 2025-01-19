import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import QuestionTypeListPage from "@/components/pages/[module]-daily-lesson/question-type-list";
import { EnumSkill } from "@/lib/enums";

export const Route = createFileRoute("/_authenticated/_dashboard/daily-lesson/question-types/")({
  component: QuestionTypeListPage,
  validateSearch: (search) => {
    return searchSchema.parse(search);
  },
});

const searchSchema = z.object({
  skill: z.nativeEnum(EnumSkill).catch(EnumSkill.reading),
});
