import { https } from 'firebase-functions';
import { initialize } from './database/index';
initialize();

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import routes from './routes';
import { IGetUserAuthInfoRequest } from './typings/IGetUserAuthInfoRequest';

dotenv.config();

const app = express();
app.use(express.json());

app.use((req: IGetUserAuthInfoRequest, res: Response, next) => {
  const auth = req.headers.authorization;
  const authToken = auth && auth.split(' ')[1];

  if (!authToken) return res.sendStatus(401);

  const jwtAuthToken = jwt.sign({ user: 'admin' }, authToken, {
    algorithm: 'HS256',
    expiresIn: '30m',
  });

  if (!process.env.TOKEN_SECRET) {
    return res.sendStatus(500);
  }

  return jwt.verify(jwtAuthToken, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    return next();
  });
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  app.use(cors());
  return next();
});

app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('#### Error Handler');
  console.log(error);
  res.sendStatus(500);
});

const expressApi = https.onRequest(app);

export { expressApi };

