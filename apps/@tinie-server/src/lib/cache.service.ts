/** @format */

import { matchShortUrl, addShortUrl } from '../../../../packages/@tinie-cache/src';

/**
 * Creates a caching service for managing short and long URL mappings.
 * This service acts as an adapter to interact with a Redis-based cache,
 * facilitating the retrieval and storage of URLs. It utilizes two key functions
 * from the '@tinie/cache' package: `matchShortUrl` for fetching a long URL based on a given short URL,
 * and `addShortUrl` for adding a new short to long URL mapping to the cache.
 *
 * The service exposes two asynchronous methods: `get` and `set`.
 *
 * - The `get` method is used to retrieve the long URL corresponding to a given short URL.
 * - The `set` method is used to store a new short to long URL mapping in the cache.
 */

export const CacheService = () => {
    return {
        /**
         * Retrieves the long URL associated with the given short URL.
         *
         * @param { string } short_url - The short URL identifier.
         * @returns { Promise<string|null> } A promise that resolves to the long URL if found, otherwise undefined.
         */
        get: async (short_url: string): Promise<string | null> => {
            return await matchShortUrl(short_url);
        },

        /**
         * Stores a new short to long URL mapping in the cache.
         * If the `long_url` is not provided, the function will not perform any action.
         *
         * @param { string } short_url - The short URL identifier.
         * @param { string | undefined } long_url - The long URL to be associated with the short URL.
         * @returns { Promise<boolean | null>} A promise that resolves when the operation is complete.
         */
        set: async (short_url: string, long_url: string | undefined): Promise<boolean | null> => {
            if (!long_url) {
                return null;
            }

            return await addShortUrl(short_url, long_url);
        },
    };
};
