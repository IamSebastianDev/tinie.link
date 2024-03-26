/** @format */

import Elysia from 'elysia';
import { HealthRouter } from './health/health.router';
import { JSend } from '@elysia-plugin/jsend';

export const ApiRouter = new Elysia({ prefix: '/api/v1' })
    // Add global middleware
    .use(JSend())
    // Add routers
    .use(HealthRouter);
