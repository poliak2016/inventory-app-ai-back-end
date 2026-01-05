import {env} from "./config/env.js"

import app from "./app.js";
import { testDB } from "./db/testDB.js";

app.listen(env.APP_PORT, () => {
  console.log(`Server is running on port ${env.APP_PORT}`);
});
// console.log("hi")
testDB()