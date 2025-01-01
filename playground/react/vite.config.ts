import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fontPlugin from "@strawr/vite-font-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), fontPlugin()],
});
