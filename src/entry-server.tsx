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

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>LapinLearn - IELTS Online</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="author" content="LapinLearn" />
  <meta name="keywords" content="LapinLearn, IELTS, học IELTS, luyện thi IELTS, thi thử IELTS online, IELTS test, học IELTS online, IELTS speaking, IELTS listening, IELTS reading, IELTS writing, khóa học IELTS, luyện IELTS online, bài tập IELTS, bài kiểm tra IELTS, cải thiện điểm IELTS, tự học IELTS, học tiếng Anh IELTS, IELTS preparation, IELTS practice test, improve IELTS score" />
  <meta property="og:url" content="https://ielts.lapinlearn.edu.vn" />
  <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/lapin-learn.appspot.com/o/Premium.jpg?alt=media&token=dfabf9e4-098a-4f57-b9d2-0203a18f3fd1" />
  <meta property="facebook:image" content="https://firebasestorage.googleapis.com/v0/b/lapin-learn.appspot.com/o/Premium.jpg?alt=media&token=dfabf9e4-098a-4f57-b9d2-0203a18f3fd1" />
  <link rel="icon" href="https://firebasestorage.googleapis.com/v0/b/lapin-learn.appspot.com/o/favicon.ico?alt=media&token=dd0dd406-2bb3-42f3-8d31-a3dfe5524c6a" />
  
  <!-- ✅ Defer loading GTM & Firebase until the client loads -->
  <script>
    if (typeof window !== "undefined") {
      var script = document.createElement("script");
      script.async = true;
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-BEE924L23L";
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-BEE924L23L');
    }
  </script>
</head>
<body>
  <script type="module">
    import RefreshRuntime from 'http://localhost:3000/@react-refresh'
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
  </script>
  <div id="root">${appHtml}</div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
  } catch (error) {
    console.error("❌ [SSR] renderToString() crashed:", error);
    return `<h1>SSR Render Failed</h1>`;
  }
}
