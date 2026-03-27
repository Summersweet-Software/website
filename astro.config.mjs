import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.summersweet.software",
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
