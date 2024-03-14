/** @format */

import express from 'express';
import { server } from './server';

const App = express();

App.use(express.json());
App.use(server);
App.listen(3000, () => console.log(`Server up on PORT 3000`));
