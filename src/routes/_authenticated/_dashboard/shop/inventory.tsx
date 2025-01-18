import { createFileRoute } from "@tanstack/react-router";

import InventoryPage from "@/components/pages/shop/inventory";

export const Route = createFileRoute("/_authenticated/_dashboard/shop/inventory")({
  component: InventoryPage,
});
