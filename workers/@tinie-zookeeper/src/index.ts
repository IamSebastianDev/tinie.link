/** @format */

import { drizzle } from 'drizzle-orm/d1';
import { Hono } from 'hono';
import { rangeAllocations } from './db/schema/range-allocations.schema';
import { Environment } from './environment';

const app = new Hono<Environment>();

app.get('/', async (c) => {
    const db = drizzle(c.env.DB);
    const results = await db.insert(rangeAllocations).values({});

    // Calculate the next range start as well as the range end.
    const { last_row_id: allocatedRangeId } = results.meta;

    return c.json({
        result: 'success',
        data: {
            allocatedRangeId,
        },
    });
});
export default app;
