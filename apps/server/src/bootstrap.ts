/** @format */

import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { cors } from '@elysiajs/cors';
import { compression } from 'elysia-compression';
import { helmet } from 'elysia-helmet';
import { requestLogger } from './middleware/request-logger';
import { startUpReporter } from './middleware/startup-reporter';
import { requestId } from './middleware/request-id';

declare module 'bun' {
    interface Env {
        APP_NAME: string;
    }
}

export const app = new Elysia();
export type App = typeof app;

app.use(staticPlugin({ assets: './assets', prefix: 'assets' }))
    .use(cors())
    .use(compression())
    .use(helmet())
    .use(requestId())
    .use(requestLogger())
    .use(startUpReporter({ name: process.env.APP_NAME }));
