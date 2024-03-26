/** @format */

import { t } from 'elysia';
import type { App } from '../../bootstrap';
import { CreateUrlService } from './create-url.service';

export const CreateUrlRouter = (app: App) =>
    app.group('create-url/', (app) =>
        app
            .decorate({
                CreateUrlService: CreateUrlService(),
            })
            .post('/', async ({ CreateUrlService, body }) => await CreateUrlService.create(body.long_url), {
                // validation
                body: t.Object({
                    long_url: t.String({
                        description: 'Must be a valid url',
                    }),
                }),
            }),
    );
