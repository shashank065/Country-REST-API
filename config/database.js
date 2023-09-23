import Sequelize from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config({path : ".env"});

// Define your database connection details
const databaseName = process.env.POSTGRES_DB || 'yourdbname';
const username = process.env.POSTGRES_USER || 'yourdbuser';
const password = process.env.POSTGRES_PASSWORD ||'yourdbpassword';
const host = process.env.POSTGRES_HOST || 'db';
const dialect = 'postgres';
// Create a Sequelize instance

const sequelize = new Sequelize(databaseName, username, password, {
  host: host,
  dialect: dialect,
});
export default sequelize;
