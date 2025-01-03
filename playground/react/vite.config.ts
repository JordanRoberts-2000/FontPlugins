import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fontPlugin from "@strawr/vite-font-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    fontPlugin({
      fonts: [
        {
          font: "Inter",
          weight: { from: "400", to: "800" },
          italic: { from: "100", to: "300" },
          axes: ["opsz", "wght"],
          subsets: ["greek-ext"],
        },
      ],
    }),
  ],
});
