import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import styleImport from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "src/auto-import.d.ts",
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    styleImport({
      // 自定义规则
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          resolveStyle: (name) => {
            return `element-plus/theme-chalk/${name}.css`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/main.scss";',
      },
    },
  },
  base: "./",
  server: {
    host: "b.zmlearn.com",
    port: 3003,
    open: true,
    https: true,
    proxy: {
      "/api/auth": {
        changeOrigin: true,
        target: "https://p-test.zmlearn.com/",
      },
      "/api/market-referral-server": {
        changeOrigin: true,
        target: "https://p-test.zmlearn.com/",
      },
      "/api/market-content": {
        changeOrigin: true,
        target: "https://p-test.zmlearn.com/",
      },
      "/api/operation-platform-management": {
        changeOrigin: true,
        target: "https://p-test.zmlearn.com/",
      },
      "/ac/ops/third-api": {
        changeOrigin: true,
        target: "https://p-test.zmlearn.com/"
      },
      "/api/ac-air-advert": {
        changeOrigin: true,
        target: "https://p-test.zmlearn.com/"
      },
    },
  },
  build:{
    manifest:true
  }
});
