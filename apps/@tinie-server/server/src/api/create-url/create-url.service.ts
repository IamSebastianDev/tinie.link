/** @format */

import { handleAsync } from '@iasd/handle-async';
import { insertShortUrl } from '@tinie/dynamo';
import type { UrlModel } from '@tinie/models';
import { InternalServerError } from 'elysia';

export const CreateUrlService = () => {
    return {
        create: async (long_url: string, short_url: string) => {
            return await handleAsync(
                async () => {
                    const entity: UrlModel = { long_url, short_url, visits: 0, created_at: new Date() };

                    return await insertShortUrl(entity);
                },
                {
                    Ok: (response) => {
                        if (!!response) {
                            return {
                                short_url: response.short_url,
                            };
                        }

                        throw new Error('Short Url could not be created');
                    },
                    Err: (err) => {
                        throw err;
                    },
                },
            );
        },
    };
};
