import { Request, Response } from 'express';
import Order from '../models/order.model';
const order = new Order();

class orderController {
  //get orders for user
  getOrdersByUser = async (req: Request, res: Response) => {
    try {
      const userId: number = parseInt(req.params.user_id);
      console.log(userId);
      const ordersForUser = await order.getOrders(userId);
      res.json({ ...ordersForUser });
    } catch (err) {
      res.send(err);
    }
  };

  //create ordder
  createOrder = async (req: Request, res: Response) => {
    try {
      if (!req.body.user_id || !req.body.status) {
        res.status(400);
        return res.json(
           'Please Enter user_id and status'
        );
      }
      const newOrder = await order.createOrder(req.body);
      if (newOrder) {
       return res.json({
          message: 'ORDER CREATED SUCCESSFULLY',
          data: { ...newOrder },
        });
      }
    } catch (err) {
      res.send(err);
    }
  };

  //get completed orders for a user
  getCompleted = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.user_id as string);
      console.log(id);
      //const status = 'completed'
      const compOrders = await order.getCompleted(id);
      res.json(
        compOrders,
      );
    } catch (err) {
      res.send(err);
    }
  };
}

export default orderController;
