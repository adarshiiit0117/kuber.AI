// ============================================================
// vite.config.js
// Vite config for the React frontend
// Proxies /chat, /purchase-gold, /transactions to the backend
// so we avoid CORS issues during development
// ============================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy API calls to FastAPI backend running on :8000
    proxy: {
      "/chat": "http://127.0.0.1:8000",
      "/purchase-gold": "http://127.0.0.1:8000",
      "/transactions": "http://127.0.0.1:8000",
    },
  },
});
