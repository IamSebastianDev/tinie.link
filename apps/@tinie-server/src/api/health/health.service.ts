/** @format */

import { uptime } from 'os';
import { getDbStatus } from '../../../../../packages/@tinie-dynamo/src';
import { getCacheStatus } from '../../../../../packages/@tinie-cache/src';
import { getZookeeperStatus } from '@tinie/range';

export const HealthService = () => {
    return {
        get: async () => {
            return {
                server: true,
                cache: await getCacheStatus(),
                db: !!(await getDbStatus()),
                zookeeper: await getZookeeperStatus(),
                uptime: uptime(),
                cache_ttl: process.env.REDIS_TTL,
                version: (await import('../../../package.json')).version,
            };
        },
    };
};
