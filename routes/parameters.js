const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Parameters = require('../models/parameter');

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  const userId = req.user.id;
  Parameters.find({ userId })
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { stats, category, updatedAt } = req.body;
  const userId = req.user.id;
  const newParameter = { stats, category, updatedAt, userId };

  Parameters.create(newParameter)
    .then(result => {
      res.location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => next(err));
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { stats, category, updatedAt } = req.body;
  const userId = req.user.id;

  const updateParameter = { stats, category, updatedAt, userId };

  Parameters.findOneAndUpdate({ _id: id, userId }, updateParameter, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('Folder name already exists');
        err.status = 400;
      }
      next(err);
    });
});


/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  Parameters.findOneAndRemove({ _id: id, userId })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => next(err));
});
module.exports = router;