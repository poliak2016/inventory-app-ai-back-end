import dotenv from 'dotenv'

const envFile =
  process.env.NODE_ENV === 'test'
    ? '.env.test'
    : process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env'

dotenv.config({ path: envFile })

import { cleanEnv, str, num } from 'envalid'

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'test'],
    default: 'development'
  }),
  
  APP_PORT: num({default: 3000}),

  DB_HOST: str(),
  DB_PORT: num({default: 5432}),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_NAME: str()

});