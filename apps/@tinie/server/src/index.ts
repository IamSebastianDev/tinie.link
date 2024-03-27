/** @format */

import './environment';
import { ApiRouter } from './api/api.router';
import { app } from './bootstrap';
import { startUpReporter } from './middleware/startup-reporter';

// Start the application using the Port provided
// by the environment.
app.use(startUpReporter()).use(ApiRouter).listen(process.env.PORT);
