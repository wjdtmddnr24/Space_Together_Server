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
  const users = req.body || [];
  const restaurants = [];
  let prefer = [];
  for (let i = 0; i < 84; i++) prefer[i] = 0;
  const visitedHistories = await History.find({meeting: {$in: users}}).sort({
    vistedAt: 1,
  });
  let weight = 1;
  for (const history of visitedHistories) {
    const restaurant = await Restaurant.findOne({_id: history.restaurantInfo});
    prefer[restaurant.id] = prefer[restaurant.id]
      ? prefer[restaurant.id] + weight
      : weight;
    weight++;
  }
  prefer = prefer.map((v, i) => ({v: v, i: i})).sort((a, b) => b.v - a.v);
  for (const p of prefer) {
    if (!p) continue;
    const restaurant = await Restaurant.findOne({id: p.i});
    if (!restaurant) continue;
    restaurants.push(restaurant);
  }
  res.json({result: 'success', data: restaurants});
});

router.post('/select/:id', async function (req, res, next) {
  const users = req.body || [];
  await new History({
    meeting: users.map((user) => user._id),
    restaurantInfo: req.params.id,
  }).save();
  const restaurant = await Restaurant.findOne({_id: req.params.id}).exec();
  for (const {_id} of users) {
    const user = await User.findOne({_id}).exec();
    if (!user) {
      continue;
    }
    user.prefer[restaurant.id] = user.prefer[restaurant.id]
      ? user.prefer[restaurant.id] + 1
      : 1;
    user.markModified('prefer');
    await user.save();
  }
  res.json({result: 'success', data: 'have a good time'});
});

module.exports = router;
