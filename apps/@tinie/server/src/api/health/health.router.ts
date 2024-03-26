/** @format */

import Elysia from 'elysia';
import { HealthService } from './health.service';

export const HealthRouter = new Elysia({ prefix: '/health' })
    .decorate({
        HealthService: HealthService(),
    })
    .get('/', ({ HealthService }) => HealthService.get());
