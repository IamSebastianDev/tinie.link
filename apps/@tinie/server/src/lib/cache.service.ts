/** @format */

import type { UrlModel } from '@tinie/models';
import { matchShortUrl, addShortUrl } from '@tinie/cache';

export const CacheService = () => {
    return {
        get: async (short_url: string) => {
            return await matchShortUrl(short_url);
        },
        set: async (short_url: string, long_url: string | undefined) => {
            if (!long_url) {
                return;
            }

            return await addShortUrl(short_url, long_url);
        },
    };
};
