import config from "../config/config.js";

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);
const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}`;

const configuration = {
  development:{
    url: URI,
    dialect: 'mysql'
  },
  production:{
    url: URI,
    dialect: 'mysql'
  }
}

export default configuration;
