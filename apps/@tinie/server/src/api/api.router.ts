/** @format */

import { HealthRouter } from './health/health.router';
import { JSend } from '@elysia-plugin/jsend';
import type { App } from '../bootstrap';
import { CreateUrlRouter } from './create-url/create-url.router';

export const ApiRouter = (app: App) =>
    app.group('api/v1', (app) => app.use(JSend()).use(HealthRouter).use(CreateUrlRouter));
