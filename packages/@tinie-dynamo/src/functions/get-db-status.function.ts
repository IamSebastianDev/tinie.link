/** @format */

import { ListTablesCommand, type ListTablesCommandOutput } from '@aws-sdk/client-dynamodb';
import { handleAsync } from '@iasd/handle-async';
import { client } from '../client';

export const getDbStatus = async () => {
    return handleAsync<ListTablesCommandOutput, boolean>(
        async () => {
            return client.send(new ListTablesCommand());
        },
        {
            Ok: ({ TableNames }) => !!TableNames?.includes('url'),
            Err: (err) => {
                console.log({ err });
                return false;
            },
        },
    );
};
