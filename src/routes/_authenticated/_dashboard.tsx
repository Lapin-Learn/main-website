import { createFileRoute, Outlet } from "@tanstack/react-router";

import SidebarLayout from "@/components/templates/sidebar-layout";

const RouteComponent = () => {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
};

export const Route = createFileRoute("/_authenticated/_dashboard")({
  component: RouteComponent,
});
