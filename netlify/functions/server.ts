import { render } from "../../dist-ssr/ssr.js";

export async function handler(event) {
  const html = await render(event.path);
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html,
  };
}
