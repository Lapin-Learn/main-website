import ReadingPage from "@/components/pages/simulated-test/reading";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_simulated-test/simulated-test")({
  component: ReadingPage,
});
