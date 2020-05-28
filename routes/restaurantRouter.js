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

module.exports = router;
