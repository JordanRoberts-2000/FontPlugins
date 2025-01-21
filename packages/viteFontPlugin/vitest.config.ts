import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["tests", "dist", "node_modules"],
    globals: true,
    // setupFiles: ["./src/lib/zod/index.ts"],
  },
});
