import JumpBandPage from "@components/pages/[module]-daily-lesson/jump-band.tsx";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { EnumSkill } from "@/lib/enums.ts";

const searchSchema = z.object({
  questionTypeId: z.string().or(z.number()).optional(),
  skill: z.nativeEnum(EnumSkill),
});

export const Route = createFileRoute("/_authenticated/daily-lesson/jump-band")({
  component: JumpBandPage,
  beforeLoad: async ({ search }) => {
    const { questionTypeId, skill } = search;
    if (!questionTypeId || !skill) {
      return redirect({ to: "/daily-lesson" });
    }
    return {};
  },
  validateSearch: searchSchema,
});
