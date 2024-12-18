import { createFileRoute, Outlet } from "@tanstack/react-router";

import SideBar from "@/components/organisms/sidebar/side-bar";

const RouteComponent = () => {
  return (
    <div className="relative flex h-screen bg-[#F8F8F8]">
      <div className="sticky top-0 z-10 h-screen">
        <SideBar />
      </div>

      <main className="z-0 flex-1 overflow-y-auto pt-12 sm:pt-0">
        <Outlet />
      </main>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/_dashboard")({
  component: RouteComponent,
});
