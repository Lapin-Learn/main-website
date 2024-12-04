import ProfileLayout from "@/components/template/profile-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/_profile")({
  component: ProfileLayout,
});
