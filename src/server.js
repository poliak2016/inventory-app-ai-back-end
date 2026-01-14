import {env} from "./config/env.js"
import {logger} from "./config/logger.js"

import app from "./app.js";
import { testDB } from "./db/testDB.js";

app.listen(env.APP_PORT, () => {
  logger.info(`Server is running on port ${env.APP_PORT}`);
});

testDB()