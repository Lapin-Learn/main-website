import "regenerator-runtime/runtime";

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { getAnalytics, logEvent } from "firebase/analytics";
import { HTTPError } from "ky";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";

import ErrorFallback from "@/components/ErrorFallback";
import PageNotFound from "@/components/PageNotFound";
import { Toaster } from "@/components/ui/toaster";
import { routeTree } from "@/routeTree.gen";

import i18n from "./i18n/i18n";
import { FIREBASE_ANALYTICS_EVENTS } from "./lib/consts";
import MetaTags from "./meta-tag";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: (error) => {
        if (error instanceof HTTPError) {
          return error.response?.status >= 500;
        }
        return false;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 3,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // 🎉 only show error toasts if we already have data in the cache
      // which indicates a failed background update
      if (query.state.data !== undefined) {
        // toast error message
        console.error(error);
      }
    },
  }),
});

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultNotFoundComponent: () => <PageNotFound />,
  defaultErrorComponent: () => <ErrorFallback />,
});

router.history.subscribe(() => {
  const analytics = getAnalytics();
  const url = router.history.location.href;
  logEvent(analytics, FIREBASE_ANALYTICS_EVENTS.screenView, {
    firebase_screen: `web/${url}`,
    firebase_screen_class: "App",
  });
});

function App() {
  const { t } = useTranslation("metadata");

  useEffect(() => {
    document.title = t("title");
  }, [t]);

  return (
    <>
      <MetaTags language={i18n.language} />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
          <Toaster />
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
