import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./tests/**", "./packages/viteFontPlugin/tests/**"],
    globals: true,
  },
});
