import { render } from "../../src/entry-server";

export const handler = async (event) => {
  console.log("Received request:", event.rawUrl);

  try {
    const url = new URL(event.rawUrl);

    if (url.pathname === "/") {
      // SSR for "/"
      const html = render(url.pathname);
      return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: html,
      };
    } else {
      // CSR for other routes → Redirect to index.html
      return {
        statusCode: 200,
        headers: { "Content-Type": "text/html" },
        body: await getIndexHtml(), // Function to fetch prebuilt index.html
      };
    }
  } catch (error) {
    console.error("❌ SSR Error:", error);
    return { statusCode: 500, body: "SSR Error" };
  }
};

// Function to fetch index.html (CSR)
async function getIndexHtml() {
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
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
}
