/** @format */

import { handleAsync } from '@iasd/handle-async';
import type { UrlModel } from '../../../@tinie-models';
import { client } from '..';
import { UpdateItemCommand } from '@aws-sdk/client-dynamodb';

export const updateUrlEntry = async (key: UrlModel['short_url']) => {
    return await handleAsync(
        async () => {
            return await client.send(
                new UpdateItemCommand({
                    TableName: 'url',
                    Key: {
                        short_url: { S: key },
                    },
                    // Define an expression to add 1 to the visits field
                    UpdateExpression: 'SET visits = visits + :inc',
                    // Define the value for :inc variable in the expression
                    ExpressionAttributeValues: {
                        ':inc': { N: '1' },
                    },
                    // Return the updated item
                    ReturnValues: 'UPDATED_NEW',
                }),
            );
        },
        {
            Ok: () => true,
            Err: (err) => false,
        },
    );
};
