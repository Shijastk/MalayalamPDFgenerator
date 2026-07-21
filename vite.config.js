import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // pdfmake ships a large UMD browser build; pre-bundling it keeps dev-server
  // reloads fast and avoids a CJS/ESM interop surprise at runtime.
  optimizeDeps: {
    include: ["pdfmake/build/pdfmake"],
  },
});
