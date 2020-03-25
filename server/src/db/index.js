import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import logger from '../logger';
import config from '../../config';

const { DB } = config;
const env = dotenv.config().parsed;

const USERNAME = env.EXPLORER_DB_USERNAME;
const PASSWORD = env.EXPLORER_DB_PASSWORD;
const connect = ({
  database, dialect, host, password, user,
}) => {
  const sequelize = new Sequelize(database, user, password, {
    dialect,
    host,
    logging: false,
    pool: {
      acquire: 30000,
      idle: 10000,
      max: 50,
      min: 0,
    },
  });

  sequelize.authenticate()
    .catch((err) => {
      logger.error('Unable to connect to the database');
      logger.error(err.stack);
      process.exit(1);
    });
  return sequelize;
};

const conn = connect({
  ...DB,
  user: USERNAME,
  password: PASSWORD,
});

export default conn;

export const close = () => conn.close();
