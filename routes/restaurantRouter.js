/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const History = require('../models/History');

/*
users : 사용자 _id들
*/
router.post('/recommend', async function (req, res, next) {
  const {users = []} = req.body;
  const restaurants = await Restaurant.find({}).exec();
  res.json({result: 'success', data: restaurants});
});

router.post('/select/:id', async function (req, res, next) {
  const users = req.body || [];
  await new History({
    meeting: users.map((user) => user._id),
    restaurantInfo: req.query.id,
  }).save();
  res.json({result: 'success', data: 'have a good time'});
});

module.exports = router;
