import { createFileRoute } from "@tanstack/react-router";

import CollectionDetailPage from "@/components/pages/collection-detail";
import { searchSchema } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/practice/$collectionId")({
  component: CollectionDetailPage,
  validateSearch: searchSchema,
});
