require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');
const tasksRouter = require('./routes/tasks');
const parametersRouter = require('./routes/parameters');
const usersRouter = require('./routes/users');
const databaseRouter = require('./routes/database');
const tankRouter = require('./routes/tank');
const livestockRouter = require('./routes/livestock');
const authRouter = require('./routes/auth');

const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(express.json());

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/tasks', tasksRouter);
app.use('/api/parameters', parametersRouter);
app.use('/api/users', usersRouter);
app.use('/api/database', databaseRouter);
app.use('/api/tank', tankRouter);
app.use('/api/livestock', livestockRouter);
app.use('/api', authRouter);

// Catch-all 404
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all Error handler
// Add NODE_ENV check to prevent stacktrace leak
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});


function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
