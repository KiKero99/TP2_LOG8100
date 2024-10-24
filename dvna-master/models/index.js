"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

require('dotenv').config(); 

const URL = process.env.POSTGRES_URL;


// Initialize Sequelize connection
const sequelize = new Sequelize( URL, {
  dialect: 'postgres', 
  logging: false, 
  dialectOptions: {
    ssl: true, // Use SSL if your PostgreSQL instance requires it (like on Azure)
  },
});

// Authenticate the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

// Synchronize models with the database
sequelize
  .sync() 
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.log('An error occurred while synchronizing the database:', err);
  });

const db = {};

// Read all model files and import them using `require()` instead of `sequelize.import()`
fs
  .readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") !== 0 && file !== "index.js"; // Exclude index.js
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes); // Replace `sequelize.import()`
    db[model.name] = model;
  });

// If the models have associations, configure them
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
