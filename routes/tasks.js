const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Tasks = require('../models/task');

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }));

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  const userId = req.user.id;
  Tasks.find({ userId })
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const { name, category, createdOn, displayOn, repeat } = req.body;
  const userId = req.user.id;
  const newTask = { name, category, createdOn, displayOn, repeat, userId };

  Tasks.create(newTask)
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
  const { name, category, createdOn, displayOn, repeat } = req.body;
  const userId = req.user.id;

  const updateTask = { name, category, createdOn, displayOn, repeat, userId };

  Tasks.findOneAndUpdate({ _id: id, userId }, updateTask, { new: true })
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

  Tasks.findOneAndRemove({ _id: id, userId })
    .then(() => {
      res.status(204).end();
    })
    .catch(err => next(err));
});

module.exports = router;