const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const Tasks = require('../models/tasks');

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  Tasks.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

module.exports = router;