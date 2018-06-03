const express = require('express');
const router = express.Router();

const passport = require('passport');

const Livestock = require('../models/livestock');

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  const userId = req.user.id;
  Livestock.find({userId})
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { name, scientificName, grouping, quantity } = req.body;
  const userId = req.user.id;
  const newLivestock = { name, scientificName, grouping, quantity, userId };

  Livestock.create(newLivestock)
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
  const { name, scientificName, grouping, quantity } = req.body;
  const userId = req.user.id;

  const updateLivestock = { name, scientificName, grouping, quantity, userId };

  Livestock.findOneAndUpdate({ _id: id, userId }, updateLivestock, { new: true })
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

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  Livestock.findOneAndRemove({ _id: id, userId })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => next(err));
});

module.exports = router;