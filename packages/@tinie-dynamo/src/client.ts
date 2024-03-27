/** @format */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import './environment';
export const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_DYNAMO_ENDPOINT,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
    },
});
