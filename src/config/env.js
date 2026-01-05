import dotenv from 'dotenv'

if (process.env.LOAD_DOTENV !== 'false') {
const envFile =
  process.env.NODE_ENV === 'test'
    ? '.env.test'
    : process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env'

dotenv.config({ path: envFile })
};

import { cleanEnv, str, num } from 'envalid'

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'development'
  }),
  
  APP_PORT: num({default: 3000}),

  POSTGRES_HOST: str(),
  POSTGRES_PORT: num({default: 5432}),
  POSTGRES_USER: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_NAME: str(),

  DATABASE_URL: str()

});