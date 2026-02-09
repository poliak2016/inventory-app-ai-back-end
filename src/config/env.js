import dotenv from 'dotenv'

if (process.env.LOAD_DOTENV !== 'false') {
const envFile =
  process.env.NODE_ENV === 'test'
    ? '.env.test'
    : process.env.NODE_ENV === 'production'
      ? '.env.prod'
      : '.env.dev'

dotenv.config({ path: envFile })
};

import { cleanEnv, str, num, bool } from 'envalid'

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'test', 'docker', 'docker-test'],
    default: 'development'
  }),
  
  APP_PORT: num({default: 3000}),
  
  LOG_LEVEL: str({
    default: "info",
    choices: ["error", "warn", "info", "debug"]
  }),

  // DB_HOST: str(),
  // DB_PORT: num({default: 5432}),
  // DB_USER: str(),
  // DB_PASSWORD: str(),
  // DB_NAME: str(),

  DATABASE_URL: str(),

  REDIS_URL: str({default:""}),
  REDIS_ENABLE: bool({}),

  RATE_LIMIT_WINDOW_SEC: num(),
  RATE_LIMIT_MAX: num(),

  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
  JWT_ACCESS_EXPIRES_IN: str(),
  JWT_REFRESH_EXPIRES_IN: str(),

  BCRYPT_SALT_ROUNDS: num({
    min:4,
    max:15,
    default: 10,
  }),
});
