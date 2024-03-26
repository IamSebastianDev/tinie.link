/** @format */

import { cpuUsage } from 'process';
import { totalmem, freemem, uptime } from 'os';
import { getDbStatus } from '@tinie/dynamo';

export const HealthService = () => {
    return {
        get: async () => {
            return {
                server: true,
                db: await getDbStatus(),
                uptime: uptime(),
            };
        },
    };
};
