/* eslint-disable object-curly-spacing */
/* eslint-disable space-before-function-paren */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  console.log('Connected to DB');
});

mongoose.connect(`mongodb://${process.env.DB_CONNECTION_INFO}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.log(err);
  res.json({result: 'fail', data: err.message});
});

module.exports = app;
