import { Request, Response, NextFunction } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import config from '../config';



const autenToken = (req: Request, res: Response, next: NextFunction) => {
            
try {
  
   const token =  req.headers["token"] || req.query.token ;
   if(token) {
   const userIn =jsonwebtoken.verify(token as string, config.jwtSecret as string);
   console.log(userIn);
      if(userIn) {
        next();
      } else {
        const error = new Error('You Are Not Authorized to complete this action');
        next(error); 
      }
   } else {
    res.json('message: no authentication found');
    return
   }

  } catch (err) {
    
    res.json(err);
  }
};
export default autenToken;
