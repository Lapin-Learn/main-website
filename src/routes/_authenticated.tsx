import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import ErrorFallback from "@/components/ErrorFallback";
import { getAuthValueFromStorage } from "@/services";
import SideBar from "@/components/organisms/side-bar";
import { userKeys } from "@/hooks/react-query/useUsers";

const AuthenticatedPage = () => {
  return (
    <div className="flex h-screen bg-[#F8F8F8]">
      <div className="sticky top-0 h-screen">
        <SideBar />
      </div>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context: { queryClient }, location }) => {
    try {
      if (!getAuthValueFromStorage()) {
        return redirect({ to: "/log-in" });
      }
      const user = queryClient.getQueryData(userKeys.identifier());
      if (!user) {
        const identifier = await getAccountIdentifier();
        if (!identifier) {
          throw new Error("User not found");
        } else {
          queryClient.setQueryData(userKeys.identifier(), identifier);
        }
      }
      if (location.pathname === "/") {
        return redirect({ to: "/practice" });
      }
      return true;
    } catch (e) {
      await signOut();
      return redirect({ to: "/log-in" });
    }
  },
  pendingComponent: () => {
    return <span>Loading Protected</span>;
  },
  errorComponent: (error) => {
    console.error(error);
    return <ErrorFallback />;
  },
  component: AuthenticatedPage,
});
