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
    server: {
        strictPort: true,
        proxy: {
            '/api/': 'http://localhost:3000',
            '/api/v1/': 'http://localhost:3000',
            '^/[A-Za-z0-9]{7}$': {
                target: 'http://localhost:3000',
                rewrite: (path) => `/api/v1/short-url/${path}`,
            },
        },
    },
});
