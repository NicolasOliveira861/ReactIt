import { https } from 'firebase-functions';
import { initialize } from './database/index';
initialize();

import express from 'express';
import { routes } from './routes';

// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

const app = express();
app.use(express.json());

app.use(routes);

const expressApi = https.onRequest(app);

export { expressApi };

