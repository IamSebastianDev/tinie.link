/** @format */

declare module 'bun' {
    interface Env {
        AWS_REGION: string;
        AWS_DYNAMO_ENDPOINT: string;
        AWS_ACCESS_KEY: string;
        AWS_ACCESS_SECRET: string;
    }
}
