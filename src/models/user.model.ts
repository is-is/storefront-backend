

import { User } from '../types/user.type';
import store from '../database/index';
import { hashPass } from '../utilities/hashPass';

class USER {
  //Add user into table users
  createUser = async (user: User): Promise<User> => {
    try {
      //1-connect to database
      const connection = await store.connect();

      //2-write sql statement
      const sql = `INSERT INTO users(fname, lname, password) VALUES($1, $2, $3) RETURNING id, fname, lname`;

      //3-run query from the database
      const response = await connection.query(sql, [
        user.fname,
        user.lname,
        hashPass(user.password),
      ]);

      //4-close the connection to store database
      connection.release();

      //5-return the user
      return response.rows[0];
    } catch (err) {
      throw new Error(`operation failed: ${(err as Error).message}`);
    }
  };

  //Get all users from table users
  getAllUsers = async (): Promise<User[]> => {
    try {
      //1-connect to database
      const connection = await store.connect();

      //2-run query from the database
      const response = await connection.query('SELECT * FROM users');

      //3-close the connection to store database
      connection.release();

      //4-return all users
      return response.rows;
    } catch (err) {
      throw new Error(`operation failed: ${(err as Error).message}`);
    }
  };

  //Get specific user
  getUser = async (id: number): Promise<User> => {
    try {
      //1-connect to database
      const connection = await store.connect();

      //2-write sql statement
      const sql = `SELECT * FROM users WHERE id = $1`;

      //3-run query from the database
      const response = await connection.query(sql, [id]);

      //4-close the connection to store database
      connection.release();

      //5-return the user
      return response.rows[0];
    } catch (err) {
      throw new Error(`operation failed: ${(err as Error).message}`);
    }
  };

  //update user info

  //Delete user
  //authenticate user
}

export default USER;
