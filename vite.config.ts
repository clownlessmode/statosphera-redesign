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
  server: {
    // Настройка прокси для обоих API-маршрутов
    proxy: {
      // Прокси для v1 API
      "/api/v1": {
        target: "https://dev.statosphera.ru",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, "/api/v1"),
      },
      // Прокси для v2 API (мобильный)
      "/api/v2": {
        target: "https://dev.statosphera.ru",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/v2/, "/api/v2"),
      },
    },
    // Разрешаем внешний доступ к серверу разработки
    host: "0.0.0.0",
    // Включаем CORS
    cors: true,
  },
  // Определяем переменные окружения, чтобы они были доступны в коде
  define: {
    "process.env.VITE_API_DOMAIN": JSON.stringify(
      "https://dev.statosphera.ru/"
    ),
    "process.env.VITE_API_URL": JSON.stringify("api/v1/"),
    "process.env.VITE_MOBILE_API_URL": JSON.stringify("api/v2/"),
    "process.env.VITE_AUTHORIZATION_CAPTCHA_KEY": JSON.stringify(
      "0x4AAAAAAAylA1q7ard0BoU4"
    ),
  },
});
