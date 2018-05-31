const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const task = require('../models/task');
const parameter = require('../models/parameter');

const seedTasks = require('../db/seed/tasks');
const seedParameters = require('../db/seed/parameters')

mongoose.connect(DATABASE_URL)
  .then(() => {
    mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    return Promise.all([
      task.insertMany(seedTasks),
      task.createIndexes(),
      parameter.insertMany(seedParameters),
      parameter.createIndexes()
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });