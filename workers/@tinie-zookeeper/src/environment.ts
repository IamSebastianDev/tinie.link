/** @format */

export type Environment = {
    Bindings: {
        DB: D1Database;
        WORKER_SECRET: string; // This is necessary for hono to infer the variable, even thought the typing suggests otherwise
    };
    Variables: {
        WORKER_SECRET: string;
    };
};
