/** @format */

import { HealthService } from './health.service';
import type { App } from '../../bootstrap';

export const HealthRouter = (app: App) =>
    app.group('health/', (app) =>
        app
            .decorate({
                HealthService: HealthService(),
            })
            .get('/', ({ HealthService }) => HealthService.get()),
    );
