import config from "./config/config.js"

import app from "./app.js";
import { testDB } from "./db/testDB.js";

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}`);
});


testDB()