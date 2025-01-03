import { createFileRoute } from "@tanstack/react-router";

import SimulatedTestDetailPage from "@/components/pages/simulated-test-detail";

export const Route = createFileRoute(
  "/_authenticated/_dashboard/practice/$collectionId/simulated-test/$simulatedTestId"
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <SimulatedTestDetailPage />;
}
