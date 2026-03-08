import * as dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const env = {
  sauceBaseUrl: getEnv('SAUCE_BASE_URL', 'https://www.saucedemo.com'),
  petstoreBaseUrl: getEnv('PETSTORE_BASE_URL', 'https://petstore.swagger.io/v2'),
  sauceUsername: process.env.SAUCE_USERNAME,
  saucePassword: process.env.SAUCE_PASSWORD,
};

export default env;