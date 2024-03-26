/** @format */

import { blue, bold, dim, underline } from 'kolorist';
import type { App } from '../bootstrap';

export type Opts = { name: string };

export const startUpReporter =
    ({ name }: Opts) =>
    (app: App) => {
        const now = new Date().toISOString();
        const prefix = `[${name}]`;

        return app
            .on('start', () => {
                const { hostname, port } = app.server ?? {};
                console.log('');
                console.log(
                    blue(`${prefix}: ${bold("Tinie's")} serving your next generation link shortener right here:`),
                );
                console.log(blue(`${prefix}: ${bold('>>')}    ${underline(`http://${hostname}:${port}/`)}`));
                console.log(blue(`${prefix}:`));
                console.log(blue(`${prefix}:       ${dim('to open, double [click] or [cmd] + [click] on MacOs')}`));
                console.log(blue(`${prefix}:`));
            })
            .get('/', () => {
                return `${prefix}: Running since ${now}`;
            });
    };
