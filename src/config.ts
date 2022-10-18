import * as dotenv from 'dotenv';
dotenv.config();

const {
  PORT,
  ENV,
  DB_HOST,
  DB_PORT,
  DB_DEV,
  DB_TEST,
  DB_USER,
  DB_PASS,
  SALT_ROUNDS,
  JWT_SECRET,
} = process.env;

export default {
  port: PORT,
  host: DB_HOST,
  dbport: DB_PORT,
  database: ENV === 'dev' ? DB_DEV : DB_TEST,
  dbuser: DB_USER,
  dbpass: DB_PASS,
  saltRounds: SALT_ROUNDS,
  jwtSecret: JWT_SECRET,
};
