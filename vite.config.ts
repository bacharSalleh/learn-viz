import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
  // No separate root — demo/index.html accessed via /demo/index.html
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "LearnViz",
      formats: ["es", "umd"],
      fileName: (format) => `learn-viz.${format}.js`,
    },
    rollupOptions: {
      external: ["katex", "highlight.js"],
      output: {
        globals: {
          katex: "katex",
          "highlight.js": "hljs",
        },
        assetFileNames: "learn-viz.[ext]",
      },
    },
  },
  server: {
    open: "/demo/index.html",
  },
}));
