import pg from "pg";
const Pool = pg.Pool;
import config from "../config/config.js";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}`;

const pool = new Pool({connectionString: URI});

export default pool;
