import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT,
  jwt: {
    authPrivateKey: process.env.AUTH_PRIVATE_KEY,
    pepper: process.env.JWT_PEPPER,
    salt: process.env.SALT,
  },
  algolia: {
    appId: process.env.ALGOLIA_APP_ID ?? '',
    apiKey: process.env.ALGOLIA_API_KEY ?? '',
  },
};