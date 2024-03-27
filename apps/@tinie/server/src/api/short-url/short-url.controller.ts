/** @format */

import { NotFoundError, t } from 'elysia';
import type { App } from '../../bootstrap';
import { ShortUrlService } from './short-url.service';
import { updateUrlEntry } from '@tinie/dynamo';
import { CacheService } from '../../lib/cache.service';

export const ShortUrlController = (app: App) =>
    app.group('/short-url', (app) =>
        app
            .decorate({
                ShortUrlService: ShortUrlService(),
                CacheService: CacheService(),
            })
            .get(
                '/:short',
                async ({ ShortUrlService, params, set }) => {
                    const entry = await ShortUrlService.get(params.short);
                    const { long_url } = entry ?? {};

                    // If no matching entry was found, we exit the handler here
                    if (!entry) {
                        throw new NotFoundError('No matching URL could be retrieved.');
                    }

                    console.log(`Retrieved URL from DB.`);
                    set.status = 301;
                    set.redirect = long_url;
                },
                {
                    beforeHandle: async ({ params, CacheService, set }) => {
                        const cached_url = await CacheService.get(params.short);

                        if (!cached_url) {
                            return;
                        }

                        console.log(`Retrieved URL from Cache.`);
                        set.status = 301;
                        set.redirect = cached_url;
                        return true;
                    },
                    afterHandle: ({ CacheService, params, set }) => {
                        // Increment the visited count and cache entry asynchronously
                        // without awaiting the result as we don't care about the result
                        updateUrlEntry(params.short);
                        CacheService.set(params.short, set.redirect);
                    },
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
