import { defineConfig } from 'vite';
import banner from 'vite-plugin-banner';
export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: ['src/index.ts'],
      formats: ['es'],
      fileName: 'bing-trigger.user',
    },
  },
});
