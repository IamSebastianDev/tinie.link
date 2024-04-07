/** @format */

import { uptime } from 'os';
import { getDbStatus } from '../../../../../packages/@tinie-dynamo/src';
import { getCacheStatus } from '../../../../../packages/@tinie-cache/src';
import { getZookeeperStatus } from '@tinie/range';

export const HealthService = () => {
    return {
        get: async () => {
            return {
                ok: true,
                uptime: uptime(),
                version: (await import('../../../package.json')).version,
            };
        },
        db: async () => {
            return {
                redis: await getCacheStatus(),
                dynamodb: !!(await getDbStatus()),
                cloudflare: await getZookeeperStatus(),
            };
        },
    };
};
