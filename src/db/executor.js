import { query } from "./query.js";

export const getExecutor = (db) => db?.query ? db : { query };

