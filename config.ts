import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  jwt: {
    pepper: process.env.JWT_PEPPER,
    salt: process.env.SALT,
  },
};