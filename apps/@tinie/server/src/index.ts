/** @format */

import { ApiRouter } from './api/api.router';
import { app } from './bootstrap';
import { startUpReporter } from './middleware/startup-reporter';

app.use(startUpReporter())
    .use(ApiRouter)
    .listen(process.env.PORT ?? 3000);
