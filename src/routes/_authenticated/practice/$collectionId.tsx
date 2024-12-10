import { createFileRoute } from "@tanstack/react-router";

import CollectionDetailPage from "@/components/pages/collection-detail";

export const Route = createFileRoute("/_authenticated/practice/$collectionId")({
  component: CollectionDetailPage,
});
