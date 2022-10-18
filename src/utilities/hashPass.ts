import bcrypt from 'bcrypt';
import config from '../config';

export const hashPass = (pass: string): string => {
  const SALT: number = parseInt(config.saltRounds as string);
  const hash = bcrypt.hashSync(pass, SALT);
  return hash;
};
