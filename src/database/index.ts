import { Pool } from 'pg';

import config from '../config';

const pool = new Pool({
  user: config.dbuser,
  host: config.host,
  database: config.database,
  password: config.dbpass,
  port: parseInt(config.dbport as string, 10),
});

export default pool;
