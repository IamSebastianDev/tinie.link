/** @format */

import { HealthController } from './health/health.controller';
import { JSend } from '@elysia-plugin/jsend';
import type { App } from '../bootstrap';
import { CreateUrlController } from './create-url/create-url.controller';
import { ShortUrlController } from './short-url/short-url.controller';

export const ApiRouter = (app: App) =>
    // Add the api/v1 group layer. This will enable backwards compatibility
    // if we ever want to change the api schema later.
    // We will use the `render.io` url rewrite feature to redirect
    // all non `/` request to `api/v1`
    app.group('api/v1', (app) =>
        app
            // Use the JSend middleware to return data in JSend format
            .use(JSend())
            // Add the HealthController, that returns data on the health
            // of the server and it's connections.
            .use(HealthController)
            // Add the CreateURLController
            .use(CreateUrlController)
            // Add the ShortURLController
            .use(ShortUrlController),
    );
