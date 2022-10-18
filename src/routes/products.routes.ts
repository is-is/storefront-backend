import express from 'express';
import productsController from '../controllers/product.controller';
import autenToken from '../middlleware/authenticate.middleware';


const router = express.Router();

const products = new productsController();

router.post('/add',autenToken, products.createProduct);
router.get('/', products.getAll);
router.get('/:id', products.getProduct);
router.get('/categories/:category', products.getByCategory);

export default router;
