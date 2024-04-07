/** @format */

import { HealthService } from './health.service';
import type { App } from '../../bootstrap';

export const HealthController = (app: App) =>
    app.group('health', (app) =>
        app
            .decorate({
                HealthService: HealthService(),
            })
            .get('/', async ({ HealthService }) => await HealthService.get(), {
                detail: {
                    description: 'Returns information about the health and status of the system.',
                },
            })
            .get('/db', async ({ HealthService }) => await HealthService.db(), {
                detail: {
                    description: 'Returns information about the health and status of the connected storage services.',
                },
            }),
    );
