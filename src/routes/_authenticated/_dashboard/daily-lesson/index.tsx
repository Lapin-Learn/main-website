import { createFileRoute } from "@tanstack/react-router";

import SkillListPage from "@/components/pages/[module]-daily-lesson/skill-list";

export const Route = createFileRoute("/_authenticated/_dashboard/daily-lesson/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SkillListPage />;
}
