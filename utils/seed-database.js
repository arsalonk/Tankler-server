require('dotenv').config();
const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const task = require('../models/task');
const parameter = require('../models/parameter');
const database = require('../models/database')
const tank = require('../models/tank')
const livestock = require('../models/livestock')

const seedTasks = require('../db/seed/tasks');
const seedParameters = require('../db/seed/parameters')
const seedDatabase = require('../db/seed/database')

mongoose.connect(DATABASE_URL)
  .then(() => {
    mongoose.connection.db.dropDatabase();
    console.log(DATABASE_URL)
  })
  .then(() => {
    return Promise.all([
      task.insertMany(seedTasks),
      task.createIndexes(),
      parameter.insertMany(seedParameters),
      parameter.createIndexes(),
      database.insertMany(seedDatabase),
      database.createIndexes(),
      tank.createIndexes(),
      livestock.createIndexes()
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });