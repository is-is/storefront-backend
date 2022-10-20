import express from 'express';
import orderController from '../controllers/order.controller';
import autenToken from '../middlleware/authenticate.middleware';

const router = express.Router();

const orderC = new orderController();

router.get('/current/:user_id', autenToken, orderC.getOrdersByUser);
router.get('/completed/:user_id', autenToken, orderC.getCompleted);
router.post('/create', autenToken, orderC.createOrder);

export default router;
