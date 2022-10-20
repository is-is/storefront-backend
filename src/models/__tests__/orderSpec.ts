import userModel from '../user.model';
import { User } from '../../types/user.type';

import orderModel from '../order.model';
import { Order } from '../../types/order.type';
import store from '../../database/index';

beforeAll(async () => {
  const newUser = {
    fname: 'user1',
    lname: 'name1',
    password: 'test123',
  } as User;

  const createdUser = await user.createUser(newUser);
});
const user = new userModel();
const order = new orderModel();

describe('ORDER MODEL CRUD OPs', () => {
  it('should have create-order method', () => {
    expect(order.createOrder).toBeDefined();
  });

  it('Get an order for current user method should exist', () => {
    expect(order.getOrders).toBeDefined();
  });

  it('Get completed orders method should exist', () => {
    expect(order.getCompleted).toBeDefined();
  });
});
describe('test model methods', () => {
  afterAll(async () => {
    const connectDb = await store.connect();

    await connectDb.query('DELETE FROM orders;');
    await connectDb.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
    await connectDb.query('DELETE FROM users;');
    await connectDb.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    connectDb.release();
  });

  const newOrder = {
    status: 'completed',
    user_id: 1,
  } as Order;

  it('should add and return new order', async () => {
    const createdOrder = await order.createOrder(newOrder);

    expect(createdOrder.id).toBe(1);
    expect(createdOrder.status).toBe('completed');
    expect(parseInt(createdOrder.user_id as unknown as string)).toBe(1);
  });
  it('should return the completed orders for user with the given id ', async () => {
    const completedOrders = await order.getCompleted(1);

    expect(parseInt(completedOrders[0].id as unknown as string)).toBe(1);
    expect(parseInt(completedOrders[0].user_id as unknown as string)).toBe(1);
    expect(completedOrders[0].status).toBe('completed');
  });
  /*
 afterAll(async () => {
    const connectDb =await store.connect();
    
    await connectDb.query('DELETE FROM orders;');
    await connectDb.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
    connectDb.release();
 });
 */
});
