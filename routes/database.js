const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Database = require('../models/database');

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  Database.find()
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

module.exports = router;