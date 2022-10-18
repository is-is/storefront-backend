//current order by user
//completed orders by user]
import { Order } from '../types/order.type';
import store from '../database/index';

class ORDER {
  //CREATE AN ORDER  FOR TEST
  createOrder = async (order: Order): Promise<Order> => {
    try {

      //1-connect to database
      const connection = await store.connect();

      //2-write sql statement
      const sql = `INSERT INTO orders(status, user_id) VALUES($1, $2) RETURNING id, status, user_id`;

      //3-run query from the database
      const response = await connection.query(sql, [
        order.status,
        order.user_id,
      ]);

      //4-close the connection to store database
      connection.release();

      //5-return the order
      return response.rows[0];
    } catch (err) {
      throw new Error(`Couldn't Add new Order: ${(err as Error).message}`);
    }
  };

  //get orders for current user
  getOrders = async (userId: number): Promise<Order[]> => {
    try {
      //1-connect to database
      const connection = await store.connect();

      //2-write sql statement
      const sql = `SELECT * FROM orders WHERE user_id=$1`;

      //3-run query from the database
      const response = await connection.query(sql, [userId]);

      //4-close the connection to store database
      connection.release();
           console.log('hahaa')
      //5-return the order
      return response.rows;
    } catch (err) {
      throw new Error(
        `Couldn't get  Orders for current user ${userId}: ${
          (err as Error).message
        }`
      );
    }
  };

  //get completed orders by user
  getCompleted = async (id: number): Promise<Order[]> => {
    try {
      //1-connect to database
      const connection = await store.connect();

      //2-write sql statement
      const status = 'completed';
      const sql = `SELECT * FROM orders WHERE user_id = $1 AND status=$2`;

      //3-run query from the database
      
      const response = await connection.query(sql, [id, status]);

      //4-close the connection to store database
      connection.release();

      //5-return the order
      return response.rows;
    } catch (err) {
      throw new Error(
        `Couldn't get  completed Orders for current user: ${
          (err as Error).message
        }`
      );
    }
  };
}
export default ORDER;
