/** @format */

import './environment';
import { Redis } from 'ioredis';

const connect = process.env.REDIS_CONNECT;
export const client = new Redis(connect);

let retry = 0;
client.on('error', () => {
    retry++;
    console.log(`Could not connect to Redis cache. Attempt: ${retry}`);

    if (retry > 10) {
        console.log(`Disconnecting from cache.`);
        client.disconnect();
    }
});
