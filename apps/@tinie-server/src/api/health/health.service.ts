/** @format */

import { cpuUsage } from 'process';
import { totalmem, freemem, uptime } from 'os';
import { getDbStatus } from '../../../../../packages/@tinie-dynamo/src';
import { getCacheStatus } from '../../../../../packages/@tinie-cache/src';

export const HealthService = () => {
    return {
        get: async () => {
            return {
                server: true,
                cache: await getCacheStatus(),
                db: await getDbStatus(),
                uptime: uptime(),
                cache_ttl: process.env.REDIS_TTL,
            };
        },
    };
};
