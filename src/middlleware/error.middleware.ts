import { Response, Request, NextFunction } from 'express';
import Error from '../interfaces/error.interface';

const errorMware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || 'Sorry, something wrong happened';
  res.status(status).json({ status, message });
};
export default errorMware;
