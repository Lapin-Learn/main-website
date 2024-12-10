import CollectionPage from "@/components/pages/collection";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/practice/$collectionId")({
  component: CollectionPage,
});
