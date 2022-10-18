import userModel from '../user.model';
import { User } from '../../types/user.type';
import store from '../../database/index';

const user = new userModel();

describe('USER MODEL CRUD OPs', () => {
it('Create user method should exist', () => {
    expect(user.createUser).toBeDefined();
});

it('Get a specific user method should exist', () => {
    expect(user.getUser).toBeDefined();
});

it('Get all users method should exist', () => {
    expect(user.getAllUsers).toBeDefined();
});

});
describe('test model methods', () => {

    afterAll(async () => {
        const connectDb =await store.connect();
        
        await connectDb.query('DELETE FROM users;');
        await connectDb.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
        connectDb.release();
     });


  const newUser = {
      fname: "user1",
      lname: "name1",
      password: "test123"
  } as User;

  it('should return the created user', async ()=> {
     const createdUser =await user.createUser(newUser);
     expect(createdUser.id).toBe(1);
     expect(createdUser.fname).toBe("user1");
     expect(createdUser.lname).toBe("name1");
  });

  it('should return the required user', async ()=> {
    const createdUser =await user.getUser(1);
    expect(createdUser.fname).toBe("user1");
    expect(createdUser.lname).toBe("name1");
 });

 it('should return all users', async ()=> {
    const createdUser =await user.getAllUsers();
    expect(createdUser[0].fname).toBe("user1");
    expect(createdUser[0].lname).toBe("name1");
 });


}); 