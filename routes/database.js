const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Database = require('../models/database');

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  Database.find({})
    .sort('name')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, scientificName, order, family, grouping, img, expanded } = req.body;
  const userId = req.user.id;

  const updateDatabase = { name, scientificName, order, family, grouping, img, expanded, userId };

  Database.findByIdAndUpdate(id, updateDatabase, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;