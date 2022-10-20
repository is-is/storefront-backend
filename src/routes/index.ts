import { Router } from 'express';
import usersRoute from './users.routes';
import productsRoute from './products.routes';
import ordersRoute from './orders.routes';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/products', productsRoute);
routes.use('/orders', ordersRoute);

export default routes;
