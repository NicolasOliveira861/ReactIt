import functions from 'firebase-functions';
import { initialize } from './database/index';
initialize();

import express from 'express';

// import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();

const app = express();
app.use(express.json());

app.get('/test', (req, res) => {
  res.send('Hello World!');
});

const expressApi = functions.https.onRequest(app);

export { expressApi };

