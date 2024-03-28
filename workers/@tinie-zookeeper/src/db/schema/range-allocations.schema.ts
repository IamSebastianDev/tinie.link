/** @format */

import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const rangeAllocations = sqliteTable('RangeAllocations', {
    rangeId: integer('RangeId').primaryKey({ autoIncrement: true }),
    rangeCreatedAt: text('RangeCreatedAt').default(sql`CURRENT_TIMESTAMP`),
});
