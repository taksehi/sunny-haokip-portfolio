import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createApiMiddleware } from './server/apiMiddleware.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'neon-api-routes',
      configureServer(server) {
        server.middlewares.use(createApiMiddleware());
      }
    }
  ],
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: false
  }
});
