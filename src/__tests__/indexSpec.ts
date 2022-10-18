import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('test the api endpoint', () => {
  it('using endpoint  would return 200', async () => {
    const response = await request.get('/store');
    console.log(response);
    expect(response.status).toBe(200);

  });

  
});

