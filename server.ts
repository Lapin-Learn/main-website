import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

async function createServer() {
  console.log("🚀 Starting development server...");

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res) => {
    const url = req.originalUrl;

    try {
      if (url === '/' || url.startsWith("/blogs")) {
        console.log("🚀 [SSR] Rendering for URL:", url);
        const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
        const appHtml = await render(url);
        res.status(200).set({ "Content-Type": "text/html" }).end(appHtml);
      } else {
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
        console.error("❌ SSR Error:", e);
        res.status(500).end(e.message);
      } else {
        console.error("❌ SSR Error:", e);
        res.status(500).end("Unknown error occurred");
      }
    }
  });

  app.listen(PORT, () => {
    console.log(`\n🌐 Server running at http://localhost:${PORT}`);
  });
}

createServer().catch((err) => {
  console.error("❌ Failed to start server:", err);
});

export default app;
