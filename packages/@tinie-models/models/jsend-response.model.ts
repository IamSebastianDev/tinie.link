/** @format */

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
