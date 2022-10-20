import supertest from 'supertest';
import app from '../..';
import { Order } from '../../types/order.type';
import { generateUserToken } from '../../utilities/genToken';
import { User } from '../../types/user.type';
import USER from '../../models/user.model';
import store from '../../database/index';


const newUser = {
  fname: 'userx',
  lname: 'namex',
  password: 'testpass',
} as User;

const newOrder = {
  status: 'completed',
  user_id: 1
} as Order;

const api = supertest(app);
const token: string = generateUserToken(newUser);
const user = new USER();


describe('test order endpoint', () => {

  beforeAll(async () => {
    user.createUser(newUser);
  })
  
  afterAll(async () => {
    const connectDb = await store.connect();

    await connectDb.query('DELETE FROM orders;');
    await connectDb.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
    await connectDb.query('DELETE FROM users;');
    await connectDb.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    connectDb.release();
  });

  it('should return order created', async () => {
    const res = await api
      .post('/store/orders/create')
      .set('content-type', 'application/json')
      .set('x-access-token', token)
      .send(newOrder)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("ORDER CREATED SUCCESSFULLY");
      });
  });

  it('should return error when status or user_id  are missing', async () => {
    const res = await api
      .post('/store/orders/create')
      .set('content-type', 'application/json')
      .set('x-access-token', token)
      .send({
        status: 'active'
      })
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body).toBe( 'Please Enter user_id and status');
      });
  });

  it('should return all orders for current user', async () => {
    const res = await api
      .get('/store/orders/current/1')
      .set('content-type', 'application/json')
      .set('x-access-token', token)
      .send()
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(parseInt(res.body[0].user_id)).toBe(1);
        expect(res.body[0].status).toBe('completed');
      });
  });


  it('should return the completed orders for user if exist', async () => {
    const res = await api
      .get('/store/orders/completed/1')
      .set('x-access-token', token)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body[0].status).toBe('completed');
      });
  });

  
  
});
