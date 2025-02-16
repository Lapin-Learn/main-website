import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import DailyLessonPage from "@/components/pages/[module]-daily-lesson";
import { EnumBandScore, EnumSkill } from "@/lib/enums";

const searchSchema = z.object({
  skill: z.nativeEnum(EnumSkill).catch(EnumSkill.reading),
  bandScore: z.nativeEnum(EnumBandScore).optional().catch(undefined),
});

export const Route = createFileRoute("/_authenticated/_dashboard/daily-lesson/")({
  component: DailyLessonPage,
  validateSearch: searchSchema.parse,
});
