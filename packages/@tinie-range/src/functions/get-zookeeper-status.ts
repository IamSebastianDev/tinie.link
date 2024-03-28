/** @format */

import { handleAsync } from '@iasd/handle-async';
import { client } from '../client';

export const getZookeeperStatus = async () => {
    return handleAsync(
        async () => {
            return await client.status();
        },
        {
            Ok: (status) => status,
            Err: () => false,
        },
    );
};
