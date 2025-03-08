import express from "express";

import { render } from "./dist-ssr/ssr.js"; // Ensure correct path

const app = express();
const PORT = 3000;

app.get("*", async (req, res) => {
  try {
    const html = await render(req.url);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    console.error("❌ [SSR] Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`\n🌐 Production SSR Server running at http://127.0.0.1:${PORT}`);
});

export default app;
