/** @format */

import './environment';
import { Redis } from 'ioredis';

const connect = process.env.REDIS_CONNECT;
export const client = new Redis(connect);
