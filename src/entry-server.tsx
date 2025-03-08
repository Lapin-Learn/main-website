import { dehydrate, QueryClientProvider } from "@tanstack/react-query";
import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import fs from "fs";
import path from "path";

import { publicKeys } from "./hooks/react-query/use-public";
import { queryClient } from "./queryClient";
import { createRouter } from "./router";
import { getBlog, getBlogs } from "./services/public";

export async function render(url: string) {
  const { renderToString } = await import("react-dom/server");

  const history = createMemoryHistory({
    initialEntries: [url],
  });
  const router = createRouter(history);

  try {
    console.log("🚀 [SSR] Preloading routes...");
    await router.load();
    if (url.startsWith("/blogs")) {
      console.log("🚀 [SSR] Preloading blogs...");
      await queryClient.prefetchQuery({
        queryKey: publicKeys.blogs,
        queryFn: getBlogs,
      });
      const blogId = url.split("/blogs/")[1];
      if (blogId) {
        await queryClient.prefetchQuery({
          queryKey: publicKeys.blog(blogId),
          queryFn: () => getBlog(blogId),
        });
      }
    }

    const dehydratedState = dehydrate(queryClient);

    const appHtml = renderToString(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );

    if (!appHtml || appHtml.length < 10) {
      console.error("❌ [SSR] renderToString() returned empty HTML!");
      console.log("🔍 [SSR] Checking router state:", router.state);
    } else {
      console.log("✅ [SSR] HTML Rendered Successfully!");
    }

    const indexHtmlPath = path.resolve("dist/index.html");
    let indexHtml = fs.readFileSync(indexHtmlPath, "utf8");

    indexHtml = indexHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>
    <script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};</script>`
    );

    return indexHtml;
  } catch (error) {
    console.error("❌ [SSR] renderToString() crashed:", error);
    return `<h1>SSR Render Failed</h1>`;
  }
}
