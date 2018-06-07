const express = require('express');
const router = express.Router();

const passport = require('passport');

const Tank = require('../models/tank');

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  const userId = req.user.id;
  Tank.find({ userId })
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { length, width, height, volume } = req.body;
  const userId = req.user.id;
  const newTank = { length, width, height, volume, userId };

  Tank.create(newTank)
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
  const { length, width, height, volume } = req.body;
  const userId = req.user.id;

  const updateTank = { length, width, height, volume, userId };

  Tank.findOneAndUpdate({ _id: id, userId }, updateTank, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  Tank.findOneAndRemove({ _id: id, userId })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => next(err));
});

module.exports = router;