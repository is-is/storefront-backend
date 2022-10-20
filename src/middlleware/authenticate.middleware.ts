import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import config from '../config';

const autenToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers['x-access-token'] || req.query.token;
    if (token) {
      const userIn = jsonwebtoken.verify(
        token as string,
        config.jwtSecret as string
      );
      if (userIn) {
        next();
      } else {
        const error = new Error(
          'You Are Not Authorized to complete this action'
        );
        next(error);
      }
    } else {
      res.status(401);
      res.json('No Authentication found');
    }
  } catch (error) {
    res.send(error);
  }
};
export default autenToken;
