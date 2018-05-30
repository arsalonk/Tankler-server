const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const TasksFolder = require('../models/tasks-folders');

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  TasksFolder.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

module.exports = router;