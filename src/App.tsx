import "regenerator-runtime/runtime";

import { HydrationBoundary, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";

import ErrorFallback from "@/components/ErrorFallback";
import { Toaster } from "@/components/ui/toaster";

import i18n from "./i18n/i18n";
import MetaTags from "./meta-tag";
import { queryClient } from "./queryClient";
import { createRouter } from "./router";

const router = createRouter();

function App({ dehydratedState }: { dehydratedState: unknown }) {
  const { t } = useTranslation("metadata");

  useEffect(() => {
    document.title = t("title");
  }, [t]);

  return (
    <>
      <MetaTags language={i18n.language} />
      <ErrorBoundary fallback={<ErrorFallback />}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <RouterProvider router={router} />
          </HydrationBoundary>
          <ReactQueryDevtools />
          <Toaster />
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
