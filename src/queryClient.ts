import { QueryCache, QueryClient } from "@tanstack/react-query";
import { HTTPError } from "ky";

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
