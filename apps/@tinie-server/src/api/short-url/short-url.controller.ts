/** @format */

import { NotFoundError, t } from 'elysia';
import type { App } from '../../bootstrap';
import { ShortUrlService } from './short-url.service';
import { updateUrlEntry } from '../../../../../packages/@tinie-dynamo/src';
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
                    detail: {
                        responses: {
                            '301': {
                                description: 'Redirect the User to the associated long URL.',
                            },
                            '404': {
                                description: 'Redirect the User to the 404 page.',
                            },
                        },
                        description:
                            'Redirects the Requester to the stored URL that is associated with the passed short URL.',
                    },
                },
            )
            .get(
                '/:short/details',
                async ({ params, ShortUrlService }) => {
                    return await ShortUrlService.details(params.short);
                },
                {
                    // Validate the incoming Short url
                    params: t.Object({
                        short: t.String({
                            maxLength: 7,
                            description:
                                'The 7 character short URL identifier for which the details should be fetched.',
                        }),
                    }),
                    detail: {
                        responses: {
                            '200': {
                                description:
                                    'Returns the `creation date`, associated `long url` and the `visits` count for the given URL.',
                            },
                            '404': {
                                description: 'Redirect the User to the 404 page.',
                            },
                        },
                        description: 'Shows `creation date`, `long url` and `visits` count for the given short URL.',
                    },
                },
            ),
    );
