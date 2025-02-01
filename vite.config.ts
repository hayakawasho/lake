import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 9999,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: '__LAKE__',
      fileName: format => `main.${format}.js`,
    },
  },
  plugins: [],
});
