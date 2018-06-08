require('dotenv').config();
const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const database = require('../models/database')
const seedDatabase = require('../db/seed/database')

mongoose.connect(DATABASE_URL)
  .then(() => {
    mongoose.connection.db.dropDatabase();
    console.log(DATABASE_URL)
  })
  .then(() => {
    return Promise.all([
      database.insertMany(seedDatabase),
      database.createIndexes()
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });