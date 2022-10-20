import supertest from 'supertest';
import app from '../..';
import { User } from '../../types/user.type';

const api = supertest(app);
let token: string = '';

const newUser = {
  fname: 'userx',
  lname: 'namex',
  password: 'testpass',
} as User;

describe('test user endpoint', () => {
  it('should return user created', async () => {
    const res = await api
      .post('/store/users/create')
      .set('content-type', 'application/json')
      .send(newUser)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.data.userToken).toBeTruthy;
        token = res.body.data.userToken;
      });
  });

  it('should return error when fname or lname or pass are missing', async () => {
    const res = await api
      .post('/store/users/create')
      .set('content-type', 'application/json')
      .send({
        fname: 'user2',
        password: 'test234',
      })
      .then((res) => {
        expect(res.body.Error).toBe(
          'Please Enter first-name, last-name and password'
        );
      });
  });

  it('should return all users for authenticated user', async () => {
    const res = await api
      .get('/store/users')
      .set('content-type', 'application/json')
      .set('x-access-token', token)
      .send()
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body[0].id).toBe(1);
        expect(res.body[0].fname).toBe('userx');
        expect(res.body[0].lname).toBe('namex');
      });
  });

  it('should return an error for not authenticated user', async () => {
    const res = await api
      .get('/store/users')
      .set('content-type', 'application/json')
      .set('x-access-token', '')
      .send()
      .then((res) => {
        expect(res.status).toBe(401);
        expect(res.body).toBe('No Authentication found');
      });
  });

  it('should return the required user if exist', async () => {
    const res = await api
      .get('/store/users/get/1')
      .set('x-access-token', token)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(1);
        expect(res.body.fname).toBe('userx');
        expect(res.body.lname).toBe('namex');
      });
  });

  it("should return 'the enter valid id' if requested user id was 12e", async () => {
    const res = await api
      .get('/store/users/get/12e')
      .set('x-access-token', token)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body).toBe('Please Enter Valid user id');
      });
  });

  it("should return 'the Can not find user with id 34' if requested user id was 34", async () => {
    const res = await api
      .get('/store/users/get/34')
      .set('x-access-token', token)
      .then((res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body).toBe(
          "USER DOESN'T EXIST: Can not find user with id 34"
        );
      });
  });
});
