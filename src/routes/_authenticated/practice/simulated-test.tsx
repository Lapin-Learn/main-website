import { createFileRoute } from "@tanstack/react-router";

import SimulatedTestPage from "@/components/pages/simulated-test";

export const Route = createFileRoute("/_authenticated/practice/simulated-test")({
  component: SimulatedTestPage,
});
