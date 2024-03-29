/** @format */

import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
    root: './src/pages/',
    build: {
        emptyOutDir: true,
        outDir: resolve(import.meta.dirname, './dist'),
        rollupOptions: {
            input: {
                main: resolve(import.meta.dirname, './src/pages/index.html'),
                'not-found': resolve(import.meta.dirname, './src/pages/not-found/index.html'),
            },
        },
    },
});
