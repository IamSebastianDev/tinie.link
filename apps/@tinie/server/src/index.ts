/** @format */

import './environment';
import { ApiRouter } from './api/api.router';
import { app } from './bootstrap';
import { startUpReporter } from './middleware/startup-reporter';

app.use(startUpReporter())
    // Add the API Router to the Elysia stack
    .use(ApiRouter)
    // Start the application using the Port provided
    // by the environment.
    .listen(process.env.PORT);
