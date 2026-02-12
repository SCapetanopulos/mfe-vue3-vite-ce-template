import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

// Build como librería + Custom Elements
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Esto hace que los SFC se compilen como custom elements
          customElement: true,
        },
      },
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main-ce.ts"),
      name: "__LIB_NAME__",
      formats: ["es"],
      fileName: () => "__FILE_NAME__.es.js",
    },
    rollupOptions: {
      // Vue va inlineado por defecto en lib mode ES; si prefieres externalizarlo, lo ajustamos.
    },
  },
});
