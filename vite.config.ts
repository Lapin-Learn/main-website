import url from "@rollup/plugin-url";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react(), tsconfigPaths(), reactRefresh()],
  define: {
    "import.meta.env.DEV": JSON.stringify(process.env.NODE_ENV !== "production"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: (id) => id.endsWith(".stories.tsx"),
      input: {
        main: path.resolve(__dirname, "index.html"),
        ssr: path.resolve(__dirname, "src/entry-server.tsx"),
      },
      plugins: [
        url({
          include: ["**/*.svg", "**/*.jpg"],
          limit: 0, // Forces files to be copied
        }),
      ],
    },
    target: "esnext",
  },
  ssr: {
    noExternal: ["@tanstack/router", "react-speech-recognition"],
    target: "node",
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime"],
  },
  esbuild: {
    jsx: "automatic",
  },
});
