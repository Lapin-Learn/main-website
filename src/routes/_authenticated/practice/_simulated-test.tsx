import { createFileRoute } from "@tanstack/react-router";

import SimulatedTestLayout from "@/components/templates/simulated-test-layout";

export const Route = createFileRoute("/_authenticated/practice/_simulated-test")({
  component: SimulatedTestLayout,
});
