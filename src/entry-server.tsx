import fs from "fs";
import path from "path";
import { QueryClientProvider } from "@tanstack/react-query";
import { createMemoryHistory, RouterProvider } from "@tanstack/react-router";
import { queryClient } from "./queryClient";
import { createRouter } from "./router";

export async function render(url: string) {
  const { renderToString } = await import("react-dom/server");

  const history = createMemoryHistory({
    initialEntries: [url],
  });
  const router = createRouter(history);

  try {
    console.log("🚀 [SSR] Preloading routes...");
    await router.load();

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

    // 📝 Load `index.html`
    const indexHtmlPath = path.resolve("dist/index.html");
    let indexHtml = fs.readFileSync(indexHtmlPath, "utf8");

    // 🔄 Replace the `<div id="root"></div>` content with SSR HTML
    indexHtml = indexHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    return indexHtml;
  } catch (error) {
    console.error("❌ [SSR] renderToString() crashed:", error);
    return `<h1>SSR Render Failed</h1>`;
  }
}
