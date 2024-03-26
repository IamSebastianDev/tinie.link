/** @format */

import { handleAsync } from '@iasd/handle-async';
import { client } from '..';
import { AttributeValue, GetItemCommand } from '@aws-sdk/client-dynamodb';
import type { UrlModel } from '@tinie/models';

export const retrieveLongUrl = async (short: string) => {
    return await handleAsync(
        async () => {
            return await client.send(
                new GetItemCommand({
                    TableName: 'url',
                    Key: {
                        short_url: { S: short },
                    },
                }),
            );
        },
        {
            Ok: ({ Item }): UrlModel | null => {
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
            },
            Err: (err) => null,
        },
    );
};
