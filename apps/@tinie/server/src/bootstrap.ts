/** @format */

import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { cors } from '@elysiajs/cors';
import { compression } from 'elysia-compression';
import { helmet } from 'elysia-helmet';
import { startUpReporter } from './middleware/startup-reporter';
import { loq } from '@elysia-plugin/loq';

declare module 'bun' {
    interface Env {
        APP_NAME: string;
    }
}

export const app = new Elysia()
    // Add request id here so that app retains it's derived type
    .onRequest(({ set, request: { headers } }) => {
        set.headers[`X-Request-ID`] = headers.get(`X-Request-ID`) || crypto.randomUUID();
    })
    .derive(({ set }) => {
        return {
            requestID: set.headers[`X-Request-ID`],
        };
    })
    .use(staticPlugin({ assets: './assets', prefix: 'assets', ignorePatterns: [/\.ico/gim] }))
    .use(cors())
    .use(compression())
    .use(helmet())
    .use(loq());

export type App = typeof app;
