/** @format */

import type { App } from '../bootstrap';

export const requestId = () => {
    const header = `X-Request-ID`;

    return (app: App) => {
        return app
            .onRequest(({ set, request: { headers } }) => {
                set.headers[header] = headers.get(header) || crypto.randomUUID();
            })
            .derive(({ set }) => {
                return {
                    requestID: set.headers[header],
                };
            });
    };
};
