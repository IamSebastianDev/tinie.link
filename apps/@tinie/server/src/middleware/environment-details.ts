/** @format */

import { blue, bold, dim, underline } from 'kolorist';
import type { App } from '../bootstrap';

/**
 * Middleware for Elysia that logs startup information.
 * When an Elysia `App` instance emits the 'start' event, this middleware
 * logs a series of messages to the console. These messages include a stylized
 * announcement indicating that Tinie's next generation link shortener service
 * is now running, along with the hostname and port where the service is available.
 */
export const environmentDetails = () => (app: App) => {
    return app.onStart(() => {
        const { hostname, port } = app.server ?? {};
        console.log('');
        console.log(blue(`${bold("Tinie's")} serving your next generation link shortener right here:`));
        console.log(blue(`${bold('>>')}    ${underline(`http://${hostname}:${port}/`)}`));
        console.log();
        console.log(blue(`       ${dim('to open, double [click] or [cmd] + [click] on MacOs')}`));
        console.log(blue(``));
    });
};
