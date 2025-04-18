import PrivacyPolicyPage from "@components/pages/privacy-policy.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  component: PrivacyPolicyPage,
});
