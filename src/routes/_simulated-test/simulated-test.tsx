import { createFileRoute } from "@tanstack/react-router";

import ReadingPage from "@/components/pages/simulated-test/reading";

export const Route = createFileRoute("/_simulated-test/simulated-test")({
  component: ReadingPage,
});
