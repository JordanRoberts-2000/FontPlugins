import type { Plugin } from "vite";

export default function fontPlugin(): Plugin {
  return {
    name: "vite-font-plugin",
    config() {
      console.log("hello world");
    },
  };
}
