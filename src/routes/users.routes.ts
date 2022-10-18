import express from 'express';
import usersController from '../controllers/user.controller';
import autenToken from '../middlleware/authenticate.middleware';

const router = express.Router();

const userC = new usersController();

router.get('/', autenToken, userC.getAll);
router.get('/:id', autenToken, userC.getUser);
router.post('/create', userC.createUser);

export default router;
