/** @format */

import swagger from '@elysiajs/swagger';
import type Elysia from 'elysia';

export const documentation =
    () =>
    <App extends Elysia>(app: App) => {
        return app.use(
            swagger({
                path: '/api',
                exclude: ['/api', '/api/json'],
                documentation: {
                    info: {
                        title: 'Tinie.xyz API Documentation',
                        version: 'API v.1',
                        description: 'Tinie is a modern, performance focused link shortener without tracking.',
                        license: {
                            name: 'MIT',
                        },
                    },
                },
            }),
        );
    };
