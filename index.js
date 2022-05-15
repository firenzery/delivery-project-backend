import express, { json } from 'express';
import { port } from './src/config';
import cors from 'cors';
import { json as _json } from 'body-parser';
import { routes } from './src/routes/client.routes';

const app = express();

app.use(json());
app.use(cors());
app.use(_json());

app.use('/client', routes);

app.listen(port, () => {
  console.log('app listening on url http://localhost:' + port )
});