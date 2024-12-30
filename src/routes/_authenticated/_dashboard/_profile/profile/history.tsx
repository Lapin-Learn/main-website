import { createFileRoute } from "@tanstack/react-router";

import HistoryPage from "@/components/pages/profile/history";

export const Route = createFileRoute("/_authenticated/_dashboard/_profile/profile/history")({
  component: HistoryPage,
});
