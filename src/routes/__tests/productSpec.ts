import supertest from 'supertest';
import app from '../..';
import { Product } from '../../types/product.type';
import { generateUserToken } from '../../utilities/genToken';
import { User } from '../../types/user.type';
import store from '../../database/index';
const api = supertest(app);


const newUser = {
    fname: 'userx',
    lname: 'namex',
    password: 'testpass',
  } as User;

  const newProduct = {
    name: 'USB WIFI adaptor',
    price: 169,
    category: 'networking',
  } as Product;

  const token: string = generateUserToken(newUser);


  describe('test products endpoint', () => {

    afterAll(async () => {
        const connectDb = await store.connect();
    
        await connectDb.query('DELETE FROM products;');
        await connectDb.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
        connectDb.release();
      });

    it('should return products created', async () => {
      const res = await api
        .post('/store/products/add')
        .set('content-type', 'application/json')
        .set('x-access-token', token)
        .send(newProduct)
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe("PRODUCT ADDED SUCCESSFULLY");
          
        });
    });

    it("should return  'product name. price, status are required' when one is missing", async () => {
        const res = await api
          .post('/store/products/add')
          .set('content-type', 'application/json')
          .set('x-access-token', token)
          .send({
            name: 'USB WIFI adaptor',
            price: 169
          })
          .then((res) => {
            expect(res.statusCode).toBe(400);
            expect(res.body).toBe('product name, price and category are required');
            
          });
      });

   it('should return all products ', async () => {
      const res = await api
        .get('/store/products')
        .set('content-type', 'application/json')
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body[0].id).toBe(1);
          expect(res.body[0].name).toBe('USB WIFI adaptor');
        });
    });
  
   it('should return the a products specific id', async () => {
      const res = await api
        .get('/store/products/1')
        .then((res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.id).toBe(1);
          
        });

    });
    
   it("should return products with specific category", async () => {
      const res = await api
        .get('/store/products/categories/networking')
        .then((res) => {
          expect(res.statusCode).toBe(200);
        });
    });
  
  });
  