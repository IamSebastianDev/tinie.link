/** @format */

import { NotFoundError, t } from 'elysia';
import type { App } from '../../bootstrap';
import { ShortUrlService } from './short-url.service';

export const ShortUrlController = (app: App) =>
    app.group('short-url/', (app) =>
        app
            .decorate({
                ShortUrlService: ShortUrlService(),
            })
            .get(
                '/:short',
                async ({ ShortUrlService, params, set }) => {
                    const long = await ShortUrlService.get(params.short);

                    console.log({ long });

                    if (long) {
                        set.status = 301;
                        set.redirect = long;
                    }

                    throw new NotFoundError('No matching url was found');
                },
                {
                    // validation
                    params: t.Object({
                        short: t.String({
                            description: 'Must be a valid url',
                        }),
                    }),
                },
            ),
    );
