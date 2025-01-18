import { createFileRoute } from "@tanstack/react-router";

import ShopPage from "@/components/pages/shop";

export const Route = createFileRoute("/_authenticated/_dashboard/shop/")({
  component: ShopPage,
});
