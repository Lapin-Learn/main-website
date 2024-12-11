import { createFileRoute } from "@tanstack/react-router";

import PracticePage from "@/components/pages/practice";
import { searchSchema } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/practice/")({
  component: PracticePage,
  validateSearch: searchSchema,
});
