import {env} from "./config/env.js"
import {logger} from "./config/logger.js"
import {initRedis} from "./config/redis.js"

import app from "./app.js";
import { testDB } from "./db/testDB.js";

// Initialize Redis connection
initRedis().catch((err) => {
  logger.error("Failed to initialize Redis", { error: err.message });
});

app.listen(env.APP_PORT, () => {
  logger.info(`Server is running on port ${env.APP_PORT}`);
});

testDB()