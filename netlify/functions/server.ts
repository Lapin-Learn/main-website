import express from "express";
import { createServer } from "http";

import { render } from "../../dist-ssr/ssr.js";

const app = express();
app.use(express.static("dist-csr"));

app.get("/", async (req, res) => {
  try {
    const html = await render(req.url);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (err) {
    console.error("SSR Error:", err);
    res.status(500).end("Internal Server Error");
  }
});

const server = createServer(app);

export default async function handler(req: Request, res: Response) {
  server.emit("request", req, res);
}
