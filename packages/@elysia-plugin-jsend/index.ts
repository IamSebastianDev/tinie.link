/** @format */

import type Elysia from 'elysia';

export const JSend = () => {
    return <App extends Elysia>(app: App) => {
        return app
            .onError(({ code, error }) => {
                // Return a status 'fail' on validation issue
                if (code === 'VALIDATION') {
                    return { status: 'fail', data: JSON.parse(error.message ?? null) };
                }

                return {
                    status: 'error',
                    code: 'status' in error ? error.status : 500,
                    message: error.message,
                    data: error ?? null,
                };
            })
            .onAfterHandle(({ response }) => {
                return {
                    status: 'success',
                    data: response ?? null,
                };
            });
    };
};
