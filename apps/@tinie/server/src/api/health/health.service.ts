/** @format */

import { cpuUsage } from 'process';
import { totalmem, freemem, uptime } from 'os';
import { getDbStatus } from '@tinie/dynamo';
import { getCacheStatus } from '@tinie/cache';

export const HealthService = () => {
    return {
        get: async () => {
            return {
                server: true,
                cache: await getCacheStatus(),
                db: await getDbStatus(),
                uptime: uptime(),
            };
        },
    };
};
