import productModel from '../product.model';
import { Product } from '../../types/product.type';
import store from '../../database/index';

const product = new productModel();

describe('PRODUCT MODEL CRUD OPs', () => {
  it('should have add-product method', () => {
    expect(product.addProduct).toBeDefined();
  });

  it('Get a specific product method should exist', () => {
    expect(product.getOne).toBeDefined();
  });

  it('Get products by category method should exist', () => {
    expect(product.getByCat).toBeDefined();
  });

  it('Get all products method should exist', () => {
    expect(product.getAllPros).toBeDefined();
  });
});
describe('test model methods', () => {
  afterAll(async () => {
    const connectDb = await store.connect();

    await connectDb.query('DELETE FROM products;');
    await connectDb.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
    connectDb.release();
  });

  const newProduct = {
    name: 'USB WIFI adaptor',
    price: 169,
    category: 'networking',
  } as Product;

  it('should add and return new product', async () => {
    const addedProduct = await product.addProduct(newProduct);

    expect(addedProduct.id).toBe(1);
    expect(addedProduct.name).toBe('USB WIFI adaptor');
    expect(parseInt(addedProduct.price as unknown as string)).toBe(169);
    expect(addedProduct.category).toBe('networking');
  });

  it('should return the required product', async () => {
    const reqProduct = await product.getOne(1);

    expect(reqProduct.name).toBe('USB WIFI adaptor');
    expect(parseInt(reqProduct.price as unknown as string)).toBe(169);
    expect(reqProduct.category).toBe('networking');
  });

  it('should return all products', async () => {
    const getAll = await product.getAllPros();
    expect(getAll[0].name).toBe('USB WIFI adaptor');
    expect(parseInt(getAll[0].price as unknown as string)).toBe(169);
    expect(getAll[0].category).toBe('networking');
  });

  it('should return  products by category', async () => {
    const getAll = await product.getByCat('networking');
    expect(getAll[0].id).toBe(1);
    expect(getAll[0].name).toBe('USB WIFI adaptor');
  });
});
