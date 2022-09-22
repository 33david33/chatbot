// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-underscore-dangle */
const {
  SERVER_PORT,
  SERVER_HOST,
  CLIENT_HOST,
  CLIENT_PORT,
  JSON_DB_FILE,
  DATABASE,
} = process.env;

const SERVER = {
  hostname: SERVER_HOST || 'localhost',
  port: SERVER_PORT || 4200,
};

const CLIENT = {
  hostname: CLIENT_HOST || 'http://localhost',
  port: CLIENT_PORT || 4200,
};

const config = {
  server: SERVER,
  client: CLIENT,
  jsonDbFile: JSON_DB_FILE || './src/bff/db/data/flow.json',
  database: DATABASE || 'json',
};

export default config;
