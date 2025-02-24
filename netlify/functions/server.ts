import { render } from "../../src/entry-server";

export const handler = async (event) => {
  const url = event.rawUrl;

  try {
    const html = render(url);
    return {
      statusCode: 200,
      headers: { "Content-Type": "text/html" },
      body: html,
    };
  } catch (error) {
    return { statusCode: 500, body: "SSR Error" };
  }
};
