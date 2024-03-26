/** @format */

import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { cors } from '@elysiajs/cors';
import { compression } from 'elysia-compression';
import { helmet } from 'elysia-helmet';
import { startUpReporter } from './middleware/startup-reporter';
import { requestId } from './middleware/request-id';
import { loq } from '@elysia-plugin/loq';

declare module 'bun' {
    interface Env {
        APP_NAME: string;
    }
}

export const app = new Elysia();
export type App = typeof app;

app.use(staticPlugin({ assets: './assets', prefix: 'assets', ignorePatterns: [/\.ico/gim] }))
    .use(cors())
    .use(compression())
    .use(helmet())
    .use(requestId())
    .use(loq())
    .use(startUpReporter());
