/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const friendRouter = require('./friendRouter');
const User = require('../models/User');

router.use('/auth', authRouter);

router.use(function (req, res, next) {
  const {token = ''} = req.query;
  if (!token) {
    next(new Error('invalid token'));
    return;
  }
  User.findOne({userId: token}).then((user) => {
    if (!user) {
      next(new Error('invalid token'));
      return;
    }
    next();
  });
});

router.use('/user', userRouter);
router.use('/friend', friendRouter);

module.exports = router;
