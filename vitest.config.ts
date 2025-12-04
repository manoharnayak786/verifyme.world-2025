import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
      "@types": path.resolve(__dirname, "client/src/types"),
      "@services": path.resolve(__dirname, "client/src/services"),
      "@config": path.resolve(__dirname, "client/src/config"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./client/src/__tests__/setup.ts",
    include: ["client/src/__tests__/**/*.test.tsx"]
  },
});
