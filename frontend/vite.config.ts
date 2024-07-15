import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Isso permite que o Vite ouça todas as interfaces de rede
    port: 5173, // Porta que o Vite deve usar
    watch: {
      usePolling: true, // Isso é necessário para evitar problemas de arquivos não detectados no Docker
    },
  },
});
