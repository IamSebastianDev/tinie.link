/** @format */

import { HealthController } from './health/health.controller';
import { JSend } from '@elysia-plugin/jsend';
import type { App } from '../bootstrap';
import { CreateUrlController } from './create-url/create-url.controller';
import { ShortUrlController } from './short-url/short-url.controller';

export const ApiRouter = (app: App) =>
    app.group('api/v1', (app) =>
        app.use(JSend()).use(HealthController).use(CreateUrlController).use(ShortUrlController),
    );
