import {env} from "./config/env.js"
import app from "./app.js";
import {logger} from "./config/logger.js"
import { testDB } from "./db/testDB.js";
import { initRedis } from "./config/redis.js";

await testDB()

await initRedis()

app.listen(env.APP_PORT, () => {
  logger.info(`Server is running on port ${env.APP_PORT}`);
});
  