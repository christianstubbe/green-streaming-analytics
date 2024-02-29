require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.MEASUREMENT_POSTGRES_USER,
    "password": process.env.MEASUREMENT_POSTGRES_PASSWORD,
    "database": process.env.MEASUREMENT_POSTGRES_DB,
    "host": process.env.MEASUREMENT_POSTGRES_HOST,
    "dialect": "postgres",
    "logging": false,
    "terminateSessionAfter": 5 * 60 * 1000
  },
  "test": {
    "username": process.env.MEASUREMENT_POSTGRES_USER,
    "password": process.env.MEASUREMENT_POSTGRES_PASSWORD,
    "database": process.env.MEASUREMENT_POSTGRES_DB,
    "host": process.env.MEASUREMENT_POSTGRES_HOST,
    "dialect": "postgres",
    "logging": false,
    "terminateSessionAfter": 30 * 60 * 1000
  },
  "production": {
    "username": process.env.MEASUREMENT_POSTGRES_USER,
    "password": process.env.MEASUREMENT_POSTGRES_PASSWORD,
    "database": process.env.MEASUREMENT_POSTGRES_DB,
    "host": process.env.MEASUREMENT_POSTGRES_HOST,
    "dialect": "postgres",
    "logging": false,
    "terminateSessionAfter": 30 * 60 * 1000
  }
};