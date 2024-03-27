/** @format */

import './environment';
import { ApiRouter } from './api/api.router';
import { app } from './bootstrap';
import { environmentDetails } from './middleware/environment-details';

app.use(environmentDetails())
    // Add the API Router to the Elysia stack
    .use(ApiRouter)
    // Start the application using the Port provided
    // by the environment.
    .listen(process.env.PORT);
