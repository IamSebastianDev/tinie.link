/** @format */

import { handleAsync } from '@iasd/handle-async';
import type { UrlModel } from '@tinie/models';
import { client } from '../client';

export const addShortUrl = async (short: string, long: string) => {
    return await handleAsync(
        async () => {
            return await client.set(short, long, 'EX', process.env.REDIS_TTL ?? '3600');
        },
        {
            Ok: (value) => value === 'OK',
            Err: () => null,
        },
    );
};
