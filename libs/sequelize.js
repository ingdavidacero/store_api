import { Sequelize } from "sequelize";
import config from "../config/config.js";
import setupModels from "../db/models/index.js";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}`;

const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: true
});

setupModels(sequelize);

export default sequelize;
