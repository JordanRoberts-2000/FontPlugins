import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fontPlugin from "@strawr/vite-font-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    fontPlugin({
      fonts: [
        "Abril Fatface",
        {
          font: "Inter",
          weight: "variable",
          italic: true,
          axes: ["opsz", "wght"],
          subsets: ["greek-ext"],
        },
        {
          font: "Poppins",
          weight: { from: "400", to: "900" },
          italic: "400",
        },
      ],
    }),
  ],
});
