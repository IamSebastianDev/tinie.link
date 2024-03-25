/** @format */

import Elysia from 'elysia';
import { HealthRouter } from './health/health.router';
import { JSendResponder } from '../middleware/jsend-responder';

export const ApiRouter = new Elysia({ prefix: '/api/v1' })
    // Add global middleware
    .use(JSendResponder({ enableMeta: process.env.NODE_ENV === 'development', version: 1 }))
    // Add routers
    .use(HealthRouter);
