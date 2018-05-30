const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const tasksFolder = require('../models/tasks-folders');
const task = require('../models/tasks')

const seedTasksFolders = require('../db/seed/tasks-folders');
const seedTasks = require('../db/seed/tasks')

mongoose.connect(DATABASE_URL)
  .then(() => {
    mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    return Promise.all([
      tasksFolder.insertMany(seedTasksFolders),
      tasksFolder.createIndexes(),
      task.insertMany(seedTasks),
      task.createIndexes()
    ]);
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });