import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { getBikes } from './app/get-bikes';
import { getBike } from './app/get-bike';
import { throwServerError } from './app/throw-server-error';
import { throwUnauthorizedError } from './app/throw-unauthorized-error';
import { createToken } from './app/token';
import { getUsers } from './app/get-users';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/bikes', getBikes);
app.get('/api/users', getUsers);
app.get('/api/bikes/:bikeId', getBike);
app.get('/api/server-error', throwServerError);
app.get('/api/unauthorized-error', throwUnauthorizedError);
app.post('/api/token', createToken);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
