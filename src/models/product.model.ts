import { Product } from '../types/product.type';
import Error from '../interfaces/error.interface';
import store from '../database/index';

class PRODUCT {
  //GET ALL PRODUCTS
  getAllPros = async (): Promise<Product[]> => {
    try {
      const db = await store.connect();
      const { rows } = await db.query('SELECT * FROM products');
      db.release();
      return rows;
    } catch (err) {
      throw new Error(`Something wrong happened: ${(err as Error).message}`);
    }
  };

  //create new product
  addProduct = async (pro: Product): Promise<Product> => {
    try {
      const db = await store.connect();
      const sql = `INSERT INTO products(name, price, category) VALUES ($1, $2, $3) RETURNING id, name, price, category`;
      const result = await db.query(sql, [pro.name, pro.price, pro.category]);
      db.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`FAILED TO ADD A NEW PRODUCT: ${(err as Error).message}`);
    }
  };

  //show|get a product by id
  getOne = async (id: number): Promise<Product> => {
    try {
      const db = await store.connect();
      const sql = `SELECT * FROM products WHERE id=$1`;
      const result = await db.query(sql, [id]);
      db.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `FAILED TO GET THE PRODUCT WITH ID ${id}: ${(err as Error).message}`
      );
    }
  };

  //get many products by category
  getByCat = async (category: string): Promise<Product[]> => {
    try {
      const db = await store.connect();
      const sql = `SELECT * FROM products WHERE category=$1`;
      const result = await db.query(sql, [category]);
      db.release();

      return result.rows;
    } catch (err) {
      throw new Error(
        `FAILED TO GET THE PRODUCTs BY CATEGORY ${category}: ${
          (err as Error).message
        }`
      );
    }
  };
}

export default PRODUCT;
