/** @format */

import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { cors } from '@elysiajs/cors';
import { compression } from 'elysia-compression';
import { helmet } from 'elysia-helmet';
import { loq } from '../../../packages/@elysia-plugin-loq';
import { documentation } from '@elysia-plugin/scalar';
import { resolve, join } from 'node:path';

export const app = new Elysia()
    // Add request id here so that app retains it's derived type
    // Elysia / Typescript will not retrain the derived values
    // when added in a different scope, even though
    // the added data is available in the context
    .onRequest(({ set, request: { headers } }) => {
        set.headers[`X-Request-ID`] = headers.get(`X-Request-ID`) || crypto.randomUUID();
    })
    .derive(({ set }) => {
        return {
            requestID: set.headers[`X-Request-ID`],
        };
    });

// Add the middlewares used by Elysia to the middleware stack and application
// `static()` serves static files
// `cors()` is used to handle cors parameters
// `compression()` will compress responses
// `helmet()` add certain security parameters and headers to the chain
// `loq()` is a custom middleware to log requests
app.use(staticPlugin({ assets: './public/assets', prefix: '/assets', ignorePatterns: [/\.ico/gim] }))
    .get('/', () => Bun.file(resolve(join(process.cwd(), './public/index.html'))))
    .get('/404', () => Bun.file(resolve(join(process.cwd(), './public/not-found/index.html'))))
    .use(documentation())
    .use(cors())
    .use(compression())
    // .use(helmet())
    .use(loq());

export type App = typeof app;
