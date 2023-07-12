import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config();

const {
  CIVITOUR_DB_USER,
  CIVITOUR_DB_PASS,
  CIVITOUR_DB_HOST,
  CIVITOUR_DB_DEV_DB_NAME,
  CIVITOUR_DB_TEST_DB_NAME,
  CIVITOUR_DB_PROD_DB_NAME,
  NODE_ENV,
} = process.env;

const databaseCredentials = {
  production: {
    username: CIVITOUR_DB_USER,
    password: CIVITOUR_DB_PASS,
    database: CIVITOUR_DB_PROD_DB_NAME,
    host: CIVITOUR_DB_HOST,
    dialect: 'postgres',
  },
};

const { username, password, database, host, dialect } =
  databaseCredentials[NODE_ENV];

module.exports = databaseCredentials;

module.exports.connection = new Sequelize(database, username, password, {
  host,
  dialect,
  port: 3306,
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  logging: false,
});
