/** @format */

import type Elysia from 'elysia';

export type Resolver = (pathname: string) => string;
export type Matcher = Record<string, Resolver | string>;
export const Rewrite = <App extends Elysia>(matcher: Matcher, handle: (app: App) => App = (app: App) => app) => {
    const matchingRegex = Object.entries(matcher).map(([key, value]) => [new RegExp(key), value] as const);

    return (app: App) => {
        return handle(
            app.onRequest(({ request, set }) => {
                const url = new URL(request.url);
                const { pathname } = url;

                // Check if the pathname matches a regex
                const match = matchingRegex.find(([key]) => key.test(pathname));

                // If there's a match, redirect accordingly
                if (!!match) {
                    const [, target] = match;
                    return (set.redirect = typeof target === 'function' ? target(pathname) : target);
                }
            }),
        );
    };
};
