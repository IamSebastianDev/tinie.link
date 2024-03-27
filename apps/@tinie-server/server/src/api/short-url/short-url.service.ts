/** @format */

import { handleAsync } from '@iasd/handle-async';
import { retrieveLongUrl } from '@tinie/dynamo';

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
    };
};
