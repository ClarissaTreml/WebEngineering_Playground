import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  base: '/WebEngineering_Playground/',
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
});
