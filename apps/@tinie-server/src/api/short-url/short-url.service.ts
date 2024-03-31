/** @format */

import { handleAsync } from '@iasd/handle-async';
import { retrieveLongUrl } from '../../../../../packages/@tinie-dynamo/src';

export const ShortUrlService = () => {
    return {
        get: async (short: string) => {
            return await handleAsync(
                async () => {
                    return retrieveLongUrl(short);
                },
                {
                    Ok: (val) => val,
                    Err: (error) => short,
                },
            );
        },
        details: async (short: string) => {
            return await handleAsync(
                async () => {
                    return retrieveLongUrl(short);
                },
                {
                    Ok: (val) => val,
                    Err: () => null,
                },
            );
        },
    };
};
