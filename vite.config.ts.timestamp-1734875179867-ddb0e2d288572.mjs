// vite.config.ts
import { TanStackRouterVite } from "file:///D:/Dev/lapin-learn/main-website/node_modules/.pnpm/@tanstack+router-plugin@1.86.0_vite@5.4.11_@types+node@22.10.1_/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import viteReact from "file:///D:/Dev/lapin-learn/main-website/node_modules/.pnpm/@vitejs+plugin-react@4.3.4_vite@5.4.11_@types+node@22.10.1_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///D:/Dev/lapin-learn/main-website/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.1/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///D:/Dev/lapin-learn/main-website/node_modules/.pnpm/vite-tsconfig-paths@5.1.4_typescript@5.7.2_vite@5.4.11_@types+node@22.10.1_/node_modules/vite-tsconfig-paths/dist/index.js";
var __vite_injected_original_dirname = "D:\\Dev\\lapin-learn\\main-website";
var vite_config_default = defineConfig({
  plugins: [TanStackRouterVite(), viteReact(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      external: (id) => id.endsWith(".stories.tsx")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEZXZcXFxcbGFwaW4tbGVhcm5cXFxcbWFpbi13ZWJzaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxEZXZcXFxcbGFwaW4tbGVhcm5cXFxcbWFpbi13ZWJzaXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9EZXYvbGFwaW4tbGVhcm4vbWFpbi13ZWJzaXRlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSBcIkB0YW5zdGFjay9yb3V0ZXItcGx1Z2luL3ZpdGVcIjtcclxuaW1wb3J0IHZpdGVSZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSBcInZpdGUtdHNjb25maWctcGF0aHNcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1RhblN0YWNrUm91dGVyVml0ZSgpLCB2aXRlUmVhY3QoKSwgdHNjb25maWdQYXRocygpXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBidWlsZDoge1xyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBleHRlcm5hbDogKGlkKSA9PiBpZC5lbmRzV2l0aChcIi5zdG9yaWVzLnRzeFwiKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVIsU0FBUywwQkFBMEI7QUFDMVQsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLG1CQUFtQjtBQUoxQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxHQUFHLGNBQWMsQ0FBQztBQUFBLEVBQzVELFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFVBQVUsQ0FBQyxPQUFPLEdBQUcsU0FBUyxjQUFjO0FBQUEsSUFDOUM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
