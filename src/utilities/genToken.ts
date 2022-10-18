import jsonwebtoken from 'jsonwebtoken';
import { User } from '../types/user.type';
import { Product } from '../types/product.type';
import { Order } from '../types/order.type';

import config from '../config';

export const generateUserToken = (type: User | Product | Order) => {
  return jsonwebtoken.sign({ type }, config.jwtSecret as string);
};
