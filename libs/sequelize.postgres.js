import { Sequelize } from "sequelize";
import config from "../config/config.js";
import setupModels from "../db/models/index.js";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true
});

setupModels(sequelize);

sequelize.sync();

export default sequelize;
