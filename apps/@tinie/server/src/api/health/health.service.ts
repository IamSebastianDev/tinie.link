/** @format */

import { cpuUsage } from 'process';
import { totalmem, freemem, uptime } from 'os';

export const HealthService = () => {
    return {
        get: () => {
            return {
                cpuUsage: cpuUsage(),
                totalMemory: totalmem(),
                freeMemory: freemem(),
                uptime: uptime(),
            };
        },
    };
};
