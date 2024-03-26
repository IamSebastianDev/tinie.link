/** @format */

import { Elysia } from 'elysia';
import { dim, bgLightYellow, bgLightGreen, bold, bgLightRed, red } from 'kolorist';

export const loq =
    () =>
    <App extends Elysia>(app: App) => {
        return app
            .onBeforeHandle(({ request, requestID }: any) => {
                const { pathname } = new URL(request.url);
                console.log(
                    dim(`[${requestID}]`),
                    bgLightYellow(`[${new Date().toISOString()}]`),
                    bgLightGreen(` (REQ) ${bold(request.method)}::${pathname} `),
                );
            })
            .onAfterHandle(({ request, requestID }: any) => {
                const { pathname } = new URL(request.url);
                console.log(
                    dim(`[${requestID}]`),
                    bgLightYellow(`[${new Date().toISOString()}]`),
                    bgLightGreen(` (RES) ${bold(request.method)}::${pathname} `),
                    bgLightGreen(` ${bold(`OK`)} `),
                );
            })
            .onError(({ code, error, request, requestID }: any) => {
                const { pathname } = new URL(request.url);
                console.log(
                    dim(`[${requestID}]`),
                    bgLightYellow(`[${new Date().toISOString()}]`),
                    bgLightRed(` ${bold(request.method)}::${pathname} `),
                    bgLightRed(` Error: ${code} `),
                );
                for (const line of error.stack?.split('\n') ?? []) {
                    console.log(red(`[Tinie.xyz]:`), red(line));
                }
            });
    };
