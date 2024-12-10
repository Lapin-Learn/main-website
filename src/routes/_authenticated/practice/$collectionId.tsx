import CollectionDetailPage from "@/components/pages/collection-detail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/practice/$collectionId")({
  component: CollectionDetailPage,
});
