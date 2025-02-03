import { createFileRoute } from "@tanstack/react-router";

import TransactionsPage from "@/components/pages/profile/transactions";

export const Route = createFileRoute("/_authenticated/_dashboard/_profile/profile/transactions")({
  component: TransactionsPage,
});
