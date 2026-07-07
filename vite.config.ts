import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      dedupe: ['react', 'react-dom'],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify: file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalizedId = id.replace(/\\/g, '/');

            if (normalizedId.includes('/node_modules/react') || normalizedId.includes('/node_modules/react-dom') || normalizedId.includes('/node_modules/react-router') || normalizedId.includes('/node_modules/react-helmet-async')) {
              return 'react';
            }

            if (normalizedId.includes('/node_modules/framer-motion') || normalizedId.includes('/node_modules/motion')) {
              return 'motion';
            }

            if (normalizedId.includes('/node_modules/lucide-react')) {
              return 'icons';
            }

            if (normalizedId.includes('/node_modules/jspdf')) {
              return 'pdf';
            }

            if (normalizedId.includes('/node_modules/html2canvas')) {
              return 'canvas';
            }

            if (normalizedId.includes('/src/pages/Anamnesebogen')) return 'page-anamnesebogen';
            if (normalizedId.includes('/src/pages/Karriere')) return 'page-karriere';
            if (normalizedId.includes('/src/pages/DigitalApp')) return 'page-digital-app';
            if (normalizedId.includes('/src/pages/DigitalKi')) return 'page-digital-ki';
            if (normalizedId.includes('/src/pages/Training')) return 'page-training';
            if (normalizedId.includes('/src/pages/UeberUns')) return 'page-ueber-uns';
            if (normalizedId.includes('/src/pages/GoogleStatistiken')) return 'page-google-statistiken';
          },
        },
      },
    },
  };
});
