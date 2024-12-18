import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_dashboard/_profile/history")({
  component: () => <div>Hello /_authenticated/_profile/profile/history!</div>,
});
