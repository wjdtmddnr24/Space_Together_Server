/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/all', function (req, res, next) {
  const {userIds = []} = req.body;
  User.find({_id: {$in: userIds}}).then((users) => {
    res.json({result: 'success', data: users});
  });
});

router.post('/:id', function (req, res, next) {
  const {id} = req.params;
  User.findOne(
    {
      userId: id,
    },
    function (err, user) {
      if (err) {
        next(err);
        return;
      }
      if (!user) return res.json({result: 'fail', data: `no such user ${id}`});
      res.json({result: 'success', data: user});
    }
  );
});

module.exports = router;
