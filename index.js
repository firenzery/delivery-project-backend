import express, { json } from 'express';
import { port } from './src/config.js';
import cors from 'cors';
import { routes } from './src/routes/client.routes.js';

const app = express();

app.use(json());
app.use(cors());

app.use('/client', routes);

app.listen(port, () => {
    console.log('app listening on url http://localhost:' + port);
});
