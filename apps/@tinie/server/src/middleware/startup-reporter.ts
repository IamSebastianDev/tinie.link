/** @format */

import { blue, bold, dim, underline } from 'kolorist';
import type { App } from '../bootstrap';

export const startUpReporter = () => (app: App) => {
    const now = new Date().toISOString();

    return app
        .on('start', () => {
            const { hostname, port } = app.server ?? {};
            console.log('');
            console.log(blue(`${bold("Tinie's")} serving your next generation link shortener right here:`));
            console.log(blue(`${bold('>>')}    ${underline(`http://${hostname}:${port}/`)}`));
            console.log();
            console.log(blue(`       ${dim('to open, double [click] or [cmd] + [click] on MacOs')}`));
            console.log(blue(``));
        })
        .get('/', () => {
            return ` Running since ${now}`;
        });
};
