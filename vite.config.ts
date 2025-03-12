import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import webfontDownload from "vite-plugin-webfont-dl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    webfontDownload([
      "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    ]),
  ],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/0_app"),
      "@pages": path.resolve(__dirname, "./src/1_pages"),
      "@widgets": path.resolve(__dirname, "./src/2_widgets"),
      "@features": path.resolve(__dirname, "./src/3_features"),
      "@entities": path.resolve(__dirname, "./src/4_entities"),
      "@shared": path.resolve(__dirname, "./src/5_shared"),
    },
  },
});
