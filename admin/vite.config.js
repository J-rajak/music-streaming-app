import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/admin": {
        target: "http://localhost:8080",
      },
      "/admin/auth": {
        target: "http://localhost:8080",
      },
    },
  },
});
