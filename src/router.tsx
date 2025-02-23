/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRouter as createTanstackRouter } from "@tanstack/react-router";

import ErrorFallback from "./components/ErrorFallback";
import PageNotFound from "./components/PageNotFound";
import { FIREBASE_ANALYTICS_EVENTS } from "./lib/consts";
import { queryClient } from "./queryClient";
import { routeTree } from "./routeTree.gen";

let getAnalytics: any, isSupported: any, logEvent: any;
if (typeof window !== "undefined") {
  ({ getAnalytics, isSupported, logEvent } = await import("firebase/analytics"));
}

export function createRouter(history?: any) {
  const router = createTanstackRouter({
    routeTree,
    context: { queryClient },
    defaultNotFoundComponent: () => <PageNotFound />,
    defaultErrorComponent: () => <ErrorFallback />,
    history,
  });

  if (typeof window !== "undefined" && getAnalytics && isSupported) {
    router.history.subscribe(() => {
      isSupported()
        .then((supported: boolean) => {
          if (supported) {
            const analytics = getAnalytics();
            const url = window.location.pathname;
            logEvent(analytics, FIREBASE_ANALYTICS_EVENTS.screenView, {
              firebase_screen: `web${url}`,
              firebase_screen_class: "App",
            });
          }
        })
        .catch(console.error);
    });
  }

  return router;
}
