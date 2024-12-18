import { createFileRoute } from "@tanstack/react-router";

import ChangePasswordPage from "@/components/pages/profile/change-password";

export const Route = createFileRoute("/_authenticated/_dashboard/_profile/change-password")({
  component: ChangePasswordPage,
});
