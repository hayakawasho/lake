import { resolve } from 'path';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: '__LAKE__',
      fileName: format => `main.${format}.js`,
    },
  },
  plugins: [
    svelte({
      preprocess: preprocess(),
    }),
  ],
});
