/** @format */

import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';
import { rangeAllocations } from './db/schema/range-allocations.schema';
import { Environment } from './environment';
import { handleAsync } from '@iasd/handle-async';

const app = new Hono<Environment>();

// On request, authorized the requester or reject the request,
// if no bearer api token was provided
app.on('GET', '/range', async (c, next) => {
    const bearer = bearerAuth({ token: c.env.WORKER_SECRET });
    return bearer(c, next);
});

// The `range` endpoint handles the creation of the request and returns the
// id of the last allocated range, which is the the new range used by the server
// requesting the new range
app.get('/range', async (c) => {
    const db = drizzle(c.env.DB);

    const allocatedRangeId = await handleAsync<number, number | null>(
        async () => {
            const results = await db.insert(rangeAllocations).values({});

            // Calculate the next range start as well as the range end.
            const { last_row_id: allocatedRangeId } = results.meta;
            return allocatedRangeId;
        },
        {
            Ok: (v) => v,
            Err: (err) => {
                return null;
            },
        },
    );

    // If a ID has been allocated successfully, return it to the requester
    if (allocatedRangeId) {
        return c.json({
            status: 'success',
            data: {
                allocatedRangeId,
            },
        });
    }

    // If no Id was allocated, return a error message
    return c.json({
        status: 'error',
        code: 500,
        message: 'No rangeId could be allocated. Check Zookeeper logs for more information.',
    });
});

// Use a `health` route to return a status `200`
app.get('/health', (c) => c.newResponse(null, 200));
export default app;
