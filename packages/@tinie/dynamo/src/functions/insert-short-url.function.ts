/** @format */

import { handleAsync } from '@iasd/handle-async';
import type { UrlModel } from '@tinie/models';
import { client } from '..';
import { PutItemCommand, type PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

export const insertShortUrl = async (entry: UrlModel) => {
    return await handleAsync<PutItemCommandOutput, UrlModel | null>(
        async () => {
            return await client.send(
                new PutItemCommand({
                    TableName: 'url',
                    ReturnValues: 'ALL_OLD',
                    Item: {
                        short_url: { S: entry.short_url },
                        long_url: { S: entry.long_url },
                        created_at: { S: entry.created_at.toISOString() },
                        visits: { N: entry.visits.toString() },
                    },
                }),
            );
        },
        {
            Ok: () => {
                return entry;
            },
            Err: (err) => {
                return null;
            },
        },
    );
};
