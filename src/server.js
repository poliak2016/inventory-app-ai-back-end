import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import config from "./config/config.js";
import { testDB } from "./db/testConnection.js";

app.listen(config.app.port, () => {
  console.log(`Server is running on port ${config.app.port}`);
});

testDB()
