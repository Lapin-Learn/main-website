import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/practice/simulated-test/result")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/practice/simulated-test/result"!</div>;
}
