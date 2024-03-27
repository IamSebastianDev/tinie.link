/** @format */

import { handleAsync } from '@iasd/handle-async';
import { client } from '../client';

export const matchShortUrl = async (short: string) => {
    return await handleAsync(
        async () => {
            return await client.get(short);
        },
        {
            Ok: (value) => value,
            Err: () => null,
        },
    );
};
