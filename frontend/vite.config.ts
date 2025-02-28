import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// if in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ReactCompilerConfig = {
  target: "18",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
    svgr(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@wails": path.resolve(__dirname, "./wailsjs"),
    },
  },
});
