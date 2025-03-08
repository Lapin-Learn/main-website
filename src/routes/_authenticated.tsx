import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import ErrorFallback from "@/components/ErrorFallback";
import GlobalMissionDialog from "@/components/organisms/global-mission-dialog";
import GlobalStreakDialog from "@/components/organisms/global-streak-dialog";
import LoadingPage from "@/components/pages/loading-page";
import { userKeys } from "@/hooks/react-query/useUsers";
import { FALLBACK_ROUTE } from "@/lib/route-permission";
import { AccountIdentifier } from "@/lib/types";
import { checkRoutePermission } from "@/lib/utils";
import { getAccountIdentifier, getAuthValueFromStorage, signOut } from "@/services";

const AuthenticatedPage = () => {
  return (
    <>
      <GlobalMissionDialog />
      <GlobalStreakDialog />
      <Outlet />
    </>
  );
};

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context: { queryClient }, location: { pathname } }) => {
    try {
      if (!getAuthValueFromStorage()) {
        return redirect({ to: "/log-in" });
      }
      const user = queryClient.getQueryData(userKeys.identifier()) as AccountIdentifier;
      if (!user) {
        const identifier = await getAccountIdentifier();
        if (!identifier) {
          throw new Error("User not found");
        } else {
          queryClient.setQueryData(userKeys.identifier(), identifier);
          if (pathname === "/" || !checkRoutePermission(pathname, identifier.role)) {
            return redirect({ to: FALLBACK_ROUTE[identifier.role] });
          }
        }
      }
      return true;
    } catch (e) {
      console.error(e);
      await signOut();
      return redirect({ to: "/log-in" });
    }
  },
  pendingComponent: () => {
    return <LoadingPage />;
  },
  errorComponent: (error) => {
    console.error(error);
    return <ErrorFallback />;
  },
  component: AuthenticatedPage,
});
