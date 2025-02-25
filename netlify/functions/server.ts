import express from "express";
import serverless from "serverless-http"; // Wrap Express app for Netlify
import fs from "fs";
import path from "path";

const app = express();

// Serve static assets from dist-csr (CSR files)
app.use(express.static(path.resolve("dist-csr")));

// SSR only for "/"
app.get("/", async (req, res) => {
  try {
    const template = fs.readFileSync("dist-ssr/index.html", "utf-8");
    const { render } = await import("../../dist-ssr/ssr.js"); // Import SSR bundle
    const appHtml = await render(req.url);
    const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (error) {
    console.error("❌ SSR Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ✅ Export the handler correctly for Netlify Functions
export const handler = serverless(app);
