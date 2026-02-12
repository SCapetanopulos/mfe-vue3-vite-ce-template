import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// Dev mode: sirve index_ce.html y monta el custom element desde /src/dev-entry.ts
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          customElement: true,
        },
      },
    }),
  ],
  server: {
    port: __DEV_PORT__,
  },
});
