import { createFileRoute } from "@tanstack/react-router";

import SimulatedTestPage from "@/components/pages/simulated-test";
// import ReadingPage from "@/components/pages/simulated-test/reading";
import ListeningPage from "@/components/pages/simulated-test/listening";

export const Route = createFileRoute("/_authenticated/practice/simulated-test")({
  // TODO: render the page for each skill base on the skillTest.skill value from get session
  component: () => SimulatedTestPage({ children: <ListeningPage /> }),
});
