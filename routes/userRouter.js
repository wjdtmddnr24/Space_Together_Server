/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:id', function (req, res, next) {
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
      Promise.all([
        User.find({_id: user.friends}).exec(),
        User.find({_id: user.friendsRequest}).exec(),
      ]).then(([friendsUser, friendsRequestUser]) => {
        user = user.toObject();
        user.friendsUser = friendsUser;
        user.friendsRequestUser = friendsRequestUser;
        // TODO : History 추가해서 반환
        console.log(user);
        res.json({result: 'success', data: user});
      });
    }
  );
});

router.post('/:id', function (req, res, next) {
  const {id} = req.params;
  const {timetable} = req.body;
  User.update(
    {userId: id},
    {
      $set: {
        timetable,
      },
    },
    function (err) {
      if (err) {
        next(err);
        return;
      }
      res.json({result: 'success', data: 'success'});
    }
  );
});

module.exports = router;
