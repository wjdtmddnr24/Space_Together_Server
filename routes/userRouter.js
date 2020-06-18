/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const History = require('../models/History');
const Restaurant = require('../models/Restaurant');

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
        History.find({meeting: {$in: user._id}}),
      ]).then(([friendsUser, friendsRequestUser, history]) => {
        user = user.toObject();
        user.friendsUser = friendsUser;
        user.friendsRequestUser = friendsRequestUser;
        user.history = history.map((h) => h.toObject());
        Promise.all(
          history
            .map((h) => Restaurant.findOne({_id: h.restaurantInfo}).exec())
            .reverse()
        ).then(([...restaruants]) => {
          restaruants.forEach((r, i) => {
            user.history[i].restaurantInfo = r.name;
            console.log(r);
          });
          console.log(user);
          res.json({result: 'success', data: user});
        });
        // TODO : History 추가해서 반환
      });
    }
  );
});

router.post('/:id', function (req, res, next) {
  const {id} = req.params;
  const {timetable = []} = req.body;
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
