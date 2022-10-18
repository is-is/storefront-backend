import { Request, Response, NextFunction } from 'express';
import userModel from '../models/user.model';
import { generateUserToken } from '../utilities/genToken';
const user = new userModel();

class usersController {
  //get all users
  getAll = async (
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<void> => {
    try {
      const allUsers = await user.getAllUsers();
      res.json({ ...allUsers });
    } catch (err) {
      res.send(err);
    }
  };

  //create user
  createUser = async (req: Request, res: Response) => {
    try {

      if(!req.body.fname || !req.body.lname || !req.body.password) {

         return  res.json({
           'Error': 'Please Enter first-name, last-name and password'
           });
      }
      const newUser = await user.createUser(req.body);
      if (newUser) {
        const userToken = generateUserToken(newUser);

        res.json({
          message: 'USER CREATED SUCCESSFULLY',
          data: { ...newUser, userToken },
        });
      } else {
        res.json({"message": "hello nouser"});
      }
    } catch (err) {
      res.send(err);
    }
  };

  //get user
  getUser = async (req: Request, res: Response, _next: NextFunction) => {
    try {
      const id = req.params.id as string;
      console.log(id);
      const newUser = await user.getUser(+id);
      res.json({
        newUser,
      });
    } catch (err) {
      res.send(err);
    }
  };
}

export default usersController;
