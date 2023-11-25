import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import WindiCSS from "vite-plugin-windicss";
import liveReload from "vite-plugin-live-reload";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { glob } from "glob";

function moveOutputPlugin() {
  return {
    name: "move-output",
    enforce: "post",
    apply: "build",
    async generateBundle(options, bundle) {
      for (const fileName in bundle) {
        if (fileName.startsWith("src/pages/")) {
          const newFileName = fileName.slice("src/pages/".length);
          bundle[fileName].fileName = newFileName;
        }
      }
    },
  };
}

export default defineConfig({
  base: "/yaMeiProject/",
  // base: '/testYamei/',
  plugins: [
    // 如果ejs更新畫面要顯示
    liveReload([
      "public/layouts/*.ejs",
      "src/pages/**/*.{js,ejs}",
      "src/pages/**/*.html",
    ]),
    ViteEjsPlugin(),
    moveOutputPlugin(),
    WindiCSS(),
  ],
  server: {
    open: "/src/pages/front/index.html", // 指定打開路徑
  },
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync("src/pages/**/*.html")
          .map((file) => [
            path.relative(
              "src/pages",
              file.slice(0, file.length - path.extname(file).length)
            ),
            fileURLToPath(new URL(file, import.meta.url)),
          ])
      ),
    },
    outDir: "dist",
  },
});
