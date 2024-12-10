import { createFileRoute } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

import PracticePage from "@/components/pages/practice";

const searchSchema = z.object({
  skill: fallback(
    z.enum(["reading", "listening", "speaking", "writing"]).optional(),
    undefined
  ).optional(),
});

export const Route = createFileRoute("/_authenticated/practice/")({
  component: PracticePage,
  validateSearch: zodValidator(searchSchema),
});
