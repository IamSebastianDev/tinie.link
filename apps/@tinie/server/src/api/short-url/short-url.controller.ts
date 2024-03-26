/** @format */

import { NotFoundError, t } from 'elysia';
import type { App } from '../../bootstrap';
import { ShortUrlService } from './short-url.service';
import { updateUrlEntry } from '@tinie/dynamo';

export const ShortUrlController = (app: App) =>
    app.group('/short-url', (app) =>
        app
            .decorate({
                ShortUrlService: ShortUrlService(),
            })
            .get(
                '/:short',
                async ({ ShortUrlService, params, set }) => {
                    const { long_url } = (await ShortUrlService.get(params.short)) ?? {};

                    if (long_url) {
                        set.status = 301;
                        set.redirect = long_url;
                        // Increment the visited count
                        updateUrlEntry(params.short);
                        return;
                    }

                    throw new NotFoundError('No matching URL could be retrieved.');
                },
                {
                    // Validate the incoming Short url
                    params: t.Object({
                        short: t.String({
                            maxLength: 7,
                            description:
                                'The 7 character short URL identifier used to translate the short URL into a long URL.',
                        }),
                    }),
                },
            ),
    );
