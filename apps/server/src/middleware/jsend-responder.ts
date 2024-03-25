/** @format */

import type { App } from '../bootstrap';

export type JSendResponse<T = any> =
    | {
          status: 'success';
          data: T;
      }
    | {
          status: 'fail';
          data: T | string;
      }
    | {
          status: 'error';
          code?: number;
          message: string;
          data: Error | T | string;
      };

export const JSendResponder = () => {
    return (app: App) => {
        return app
            .onError(({ code, error }) => {
                // Return a status 'fail' on validation issue
                if (code === 'VALIDATION') {
                    return { status: 'fail', data: error.message ?? null };
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
