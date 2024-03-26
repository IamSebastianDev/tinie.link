/** @format */

import { ApiRouter } from './api/api.router';
import { app } from './bootstrap';

app.use(ApiRouter).listen(process.env.PORT ?? 3000);
