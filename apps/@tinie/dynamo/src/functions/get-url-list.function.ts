/** @format */

import { handleAsync } from '@iasd/handle-async';
import { client } from '..';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import type { UrlModel } from '@tinie/models';

export const getUrlList = async (items: number) => {
    return await handleAsync(
        async () => {
            return client.send(
                new ScanCommand({
                    TableName: 'url',
                    Limit: items,
                }),
            );
        },
        {
            Ok: ({ Items }) => {
                return (Items ?? []).map((Item) => {
                    const keys: (keyof UrlModel)[] = ['created_at', 'long_url', 'short_url', 'visits'];
                    if (Item && keys.every((key) => !!Item[key])) {
                        return {
                            short_url: Item.short_url.S!,
                            long_url: Item.long_url.S!,
                            visits: parseInt(Item.visits.N!),
                            created_at: new Date(Item.created_at.S!),
                        };
                    }

                    return null;
                });
            },
            Err: (err) => null,
        },
    );
};
