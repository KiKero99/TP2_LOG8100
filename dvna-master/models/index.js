"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

require('dotenv').config(); 

const database = process.env.POSTGRES_DB || 'mydatabase';
const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'password';
const host = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  logging: false, 
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

sequelize
  .sync() 
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch(err => {
    console.log('An error occurred while synchronizing the database:', err);
  });

const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") !== 0 && file !== "index.js";
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
