require('dotenv').config(); // Load environment variables from .env

const { Sequelize } = require('sequelize');

// Check that all necessary environment variables are defined
const database = process.env.POSTGRES_DB || 'mydatabase';
const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'password';
const host = process.env.DB_HOST || 'localhost'; // Fall back to 'localhost' if DB_HOST is not set

// Create a new instance of Sequelize with the database connection details
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  logging: false,  // Disable logging (optional)
});

module.exports = sequelize;
