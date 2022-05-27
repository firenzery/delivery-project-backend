import express, { json } from 'express';
import { port, host } from './src/config.js';
import cors from 'cors';
import { routes as clientRoute } from './src/routes/client.routes.js';
import { routes as productsRoute } from './src/routes/products.routes.js';
import { routes as categoriesRoute } from './src/routes/categories.routes.js';
import { routes as adressRoute } from './src/routes/address.routes.js'

const app = express();

app.use(json());
app.use(cors());

app.use('/client', clientRoute);
app.use('/products', productsRoute);
app.use('/categories', categoriesRoute);
app.use('/adress', adressRoute);

app.listen(port, () => {
    console.log(`app listening on url ${host}:` + port);
});
