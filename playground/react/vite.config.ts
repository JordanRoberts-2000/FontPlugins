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
          font: "Aclonica",
        },
        {
          font: "Inter",
          weight: "400",
          italic: true,
          axes: ["opsz", "wght"],
          subsets: ["greek-ext"],
        },
        {
          font: "Poppins",
          weight: { from: "500", to: "900" },
          italic: "400",
          subsets: "all",
        },
        {
          font: "DM Sans",
          axes: "all",
          subsets: "latin-ext",
        },
      ],
    }),
  ],
});
