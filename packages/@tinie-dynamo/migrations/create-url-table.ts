/** @format */

import { CreateTableCommand, DeleteTableCommand, DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../src/client';

export const migration = {
    run: async (client: DynamoDBClient, refresh: boolean = false) => {
        const tableDefinitions = [
            { name: 'url', attributes: [{ name: 'short_url', type: 'S', key: 'HASH' } as const] },
        ];

        const { TableNames } = await client.send(new ListTablesCommand({ Limit: 10 }));

        for (const table of tableDefinitions) {
            const { name, attributes } = table;
            console.log(`Migrating table ${name}.`);

            // Exit early if the table already exists, and the table should not be recreated
            if (TableNames?.includes(name)) {
                if (!refresh) {
                    continue;
                }

                if (refresh) {
                    await client.send(new DeleteTableCommand({ TableName: name }));
                }
            }

            // Create the table according to the data specified in the table definition
            const result = await client.send(
                new CreateTableCommand({
                    TableName: name,
                    BillingMode: 'PAY_PER_REQUEST',
                    KeySchema: [
                        ...attributes.map(({ name, key }) => ({
                            AttributeName: name,
                            KeyType: key,
                        })),
                    ],
                    AttributeDefinitions: [
                        ...attributes.map(({ name, type }) => ({
                            AttributeName: name,
                            AttributeType: type,
                        })),
                    ],
                }),
            );

            console.log({ result });
        }
    },
};

migration.run(client, true);
