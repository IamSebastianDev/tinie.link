/** @format */

import { ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { handleAsync } from '@iasd/handle-async';
import { client } from '../client';

export const getDbStatus = async () => {
    return handleAsync(
        async () => {
            return client.send(new ListTablesCommand());
        },
        {
            Ok: ({ TableNames }) => TableNames?.includes('url'),
            Err: () => false,
        },
    );
};
