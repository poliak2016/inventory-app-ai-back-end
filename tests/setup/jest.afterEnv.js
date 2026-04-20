import {pool} from "../../src/db/pool.js";
import { cleanDB } from "./cleanDB.js";

beforeEach(async() => {
  await cleanDB();
})

afterAll(async() => {
  await pool.end();
});