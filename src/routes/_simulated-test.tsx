import SimulatedTestLayout from "@/components/templates/simulated-test-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_simulated-test")({
  component: SimulatedTestLayout,
});
