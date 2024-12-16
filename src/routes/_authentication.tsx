import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import AppLogo from "@/assets/icons/AppLogo";
import Auth from "@/assets/images/auth-bg.jpg";
import { getAuthValueFromStorage } from "@/services";

export const Route = createFileRoute("/_authentication")({
  beforeLoad: async () => {
    try {
      if (getAuthValueFromStorage()) {
        return redirect({ to: "/" });
      }
      return true;
    } catch (e) {
      console.error(e);
      return redirect({ to: "/log-in" });
    }
  },
  component: AuthLayout,
});

export default function AuthLayout() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6 overflow-auto bg-white pb-6 sm:flex-row sm:p-6">
      <img
        src={Auth}
        className="h-40 w-full rounded-none object-cover sm:h-full sm:flex-1 md:rounded-3xl"
      />
      <div className="relative flex h-full flex-col items-center justify-between md:flex-1">
        <AppLogo />
        <Outlet />
      </div>
    </div>
  );
}
