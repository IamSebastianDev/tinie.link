/** @format */

import Elysia from 'elysia';
import { HealthRouter } from './health/health.router';
import { JSend } from '@elysia-plugin/jsend';
import type { App } from '../bootstrap';

export const ApiRouter = (app: App) => app.group('api/v1', (app) => app.use(JSend()).use(HealthRouter));
