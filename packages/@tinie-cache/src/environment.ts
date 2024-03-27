/** @format */

declare module 'bun' {
    interface Env {
        REDIS_CONNECT: string;
        REDIS_TTL: string;
    }
}
