/** @format */

declare module 'bun' {
    interface Env {
        WORKER_CONNECT: string;
        WORKER_SECRET: string;
    }
}
