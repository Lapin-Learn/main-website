import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import Auth from "@/assets/images/auth-bg.jpg";
import { getAuthValueFromStorage } from "@/services";
import AppLogo from "@/assets/AppLogo";

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
    <div className="flex h-screen w-screen flex-row items-center justify-center gap-6 overflow-auto bg-white p-6">
      <img src={Auth} className="size-full flex-1 rounded-3xl object-cover" />
      <div className="relative flex h-full flex-1 flex-col items-center justify-between">
        <AppLogo />
        <Outlet />
      </div>
    </div>
  );
}
