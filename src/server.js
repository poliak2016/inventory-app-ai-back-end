import {env} from "./config/env.js"
import app from "./app.js";
import {logger} from "./config/logger.js"
import { testDB } from "./db/testDB.js";
import { redis } from "./config/redis.js";

await redis.connect()
testDB();

app.listen(env.APP_PORT, () => {
  logger.info(`Server is running on port ${env.APP_PORT}`);
});

