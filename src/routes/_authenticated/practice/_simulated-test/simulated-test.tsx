import { createFileRoute } from "@tanstack/react-router";

import ReadingPage from "@/components/pages/simulated-test/reading";

export const Route = createFileRoute("/_authenticated/practice/_simulated-test/simulated-test")({
  // TODO: render the page for each skill base on the skillTest.skill value from get session
  component: ReadingPage,
});
