import { defineConfig } from 'vite';

export default defineConfig({
  base: '/WebEngineering_Playground/',
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
});
