
TO START THE API
-npm run start

THE BASE ENDPOINT IS localhost:3000/store

ENVIROMENT VARIABLES
PORT= 3000 //port of our server 
ENV=dev

DB_HOST = localhost
DB_PORT=5432 // for database
DB_DEV=store_dev
DB_TEST=store_test
DB_USER=postgres
DB_PASS=engesraa58
SALT_ROUNDS = 10
JWT_SECRET = test123

***SET UP THE DATABASES
--ON CMD TYPE
-psql -U postgres
-then enter the password for the user [postgres] which is in y case [engesraa58]
 -CREATE DATABASE store_dev;    //for development
 -CREATE DATABASE store_test;   //for testing enviroment
 **to create tables required for our store_dev database first connect to this database
 - \c store_dev; //connect to the database named [store_dev]
 -\dt //list all tables exist in the current database

 

 ****TO INSTALL PACKAGES NEEDED FOR THE PROJECT WHICH ARE IN package.json file in dependecies 
  --- ON THE TERMINAL ON THE ROOT Of OUR PROJECT DIRECTORY RUN
    -npm install
    here some important packages for production 
-----   "bcrypt"         // for password hashing
        "db-migrate"     //for database migration
        "db-migrate-pg"  //for postgres database migration
        "dotenv":       //for enviroment variables to be separated and secured
        "pg":           //postgres database for storing data app
        "jsonwebtoken": //for authentication and authorization for secure access
        
        
        



TO RUN DATABASE MIGRATION up
npm run migration


----TESTING
 npm run test

 Authentication 
 in Http Headers 
 i added a header with name token and the value will be the generated token from user creation

THANKS

MAY BE I HAVE issues with authentications, cause the token i set to headers with request for test is expired 
please tell me if the authentication code have problems or need to fix it
thanks for your time