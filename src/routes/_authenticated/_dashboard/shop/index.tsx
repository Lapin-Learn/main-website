import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import ShopPage from "@/components/pages/shop";

enum EnumTab {
  shop = "shop",
  inventory = "inventory",
}

const searchSchema = z.object({
  tab: z.nativeEnum(EnumTab).catch(EnumTab.shop),
});
export const Route = createFileRoute("/_authenticated/_dashboard/shop/")({
  component: ShopPage,
  validateSearch: searchSchema,
});
