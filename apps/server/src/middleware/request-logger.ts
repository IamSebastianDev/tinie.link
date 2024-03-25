/** @format */

import type { App } from '../bootstrap';
import { blue, bold, bgLightGreen, bgLightYellow, bgLightRed, red, dim } from 'kolorist';

export const requestLogger = () => (app: App) => {
    return app
        .onBeforeHandle(({ request, requestID }: any) => {
            const { pathname } = new URL(request.url);
            console.log(
                blue(`[Tinie.xyz]:`),
                dim(`[${requestID}]`),
                bgLightYellow(`[${new Date().toISOString()}]`),
                bgLightGreen(` ${bold(request.method)}::${pathname} `),
            );
        })
        .onAfterHandle(({ request, requestID }: any) => {
            const { pathname } = new URL(request.url);
            console.log(
                blue(`[Tinie.xyz]:`),
                dim(`[${requestID}]`),
                bgLightYellow(`[${new Date().toISOString()}]`),
                bgLightGreen(` ${bold(request.method)}::${pathname} `),
                bgLightGreen(` ${bold(`OK`)} `),
            );
        })
        .onError(({ code, error, request, requestID }: any) => {
            const { pathname } = new URL(request.url);
            console.log(
                red(`[Tinie.xyz]:`),
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
