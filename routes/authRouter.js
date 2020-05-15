/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.use('/login', async function (req, res, next) {
  // TODO : routing
  // id, pw -> {result : 'success', data : '~' }
  // id, pw -> {result : 'fail', data : '~' }
  const {id = '', pw = ''} = req.body;
  const user = await User.findOne({userId: id});
  if (!user) {
    res.json({result: 'fail', data: `no such user ${id}`});
  } else {
    res.json({result: 'success', data: `${id}`});
  }
});

router.use('/signup', async function (req, res, next) {
  // id, pw -> {result : 'success', data : '~' }
  // id, pw -> {result : 'error', data : '~' }
  const {username = '', id = '', pw = ''} = req.body;
  const user = await User.findOne({userId: id});
  if (user) {
    res.json({result: 'fail', data: `user ${id} already exists`});
    return;
  }
  new User({userId: id, password: pw, username}).save();
  res.json({result: 'success', data: `${id}`});
});

module.exports = router;
