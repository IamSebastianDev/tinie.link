/** @format */

import { handleAsync } from '@iasd/handle-async';
import { client } from '../client';

export const getCacheStatus = async () => {
    return await handleAsync(
        async () => {
            return client.status;
        },
        {
            Ok: (status) => status === 'ready',
            Err: () => false,
        },
    );
};
