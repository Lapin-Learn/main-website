import { createFileRoute } from "@tanstack/react-router";

import ProfileLayout from "@/components/templates/profile-layout";

export const Route = createFileRoute("/_authenticated/_profile")({
  component: ProfileLayout,
});
