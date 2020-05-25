/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 친구들 목록 반환
router.get('/', async function (req, res, next) {
  const user = await User.findOne({userId: req.query.token});
  const friends = await User.find({_id: {$in: user.friends}});
  res.json({result: 'success', data: friends});
});

// 요청온 친구들 목록 반환
router.get('/request', async function (req, res, next) {
  const user = await User.findOne({userId: req.query.token});
  const friends = await User.find({_id: {$in: user.friendsRequest}});
  res.json({result: 'success', data: friends});
});

router.post('/accept/:id', function (req, res, next) {
  const target_id = req.params.id;
  const source_id = req.query.token;

  Promise.all([
    User.findOne({_id: target_id}).exec(),
    User.findOne({userId: source_id}).exec(),
  ]).then(([target_user, source_user]) => {
    if (!target_user || !source_user) {
      next(new Error(`${target_id} or ${source_id} is not valid`));
      return;
    }

    if (source_user.friendsRequest.includes(target_user._id)) {
      source_user.friendsRequest.pull(target_user._id);
      source_user.friends.push(target_user._id);
      target_user.friends.push(source_user._id);
      target_user.save().then(() => {
        source_user.save().then(() => {
          res.json({result: 'success', data: `${source_id} -> ${target_id}`});
        });
        // TODO : 신청했던 사람에게 알림기능으로 알리기
      });
    } else {
      res.json({result: 'fail', data: `no request from ${target_id}`});
    }
  });
});

router.post('/request/:id', function (req, res, next) {
  const target_id = req.params.id;
  const source_id = req.query.token;

  Promise.all([
    User.findOne({userId: target_id}).exec(),
    User.findOne({userId: source_id}).exec(),
  ]).then(([target_user, source_user]) => {
    if (!target_user || !source_user) {
      next(new Error(`${target_id} or ${source_id} is not valid`));
      return;
    }

    if (source_user.friends.includes(target_user._id)) {
      next(new Error(`already friend with ${target_id}`));
      return;
    }

    if (source_user.friendsRequest.includes(target_user._id)) {
      next(new Error(`Friend already requested to you`));
      return;
    }

    console.log(target_user.friendsRequest, source_user._id);
    if (!target_user.friendsRequest.includes(source_user._id)) {
      target_user.friendsRequest.push(source_user._id);
      target_user
        .save()
        .then(() =>
          res.json({result: 'success', data: `${source_id} -> ${target_id}`})
        );
    } else {
      next(new Error(`already requested to ${target_id}`));
      return;
    }
    // TODO : 신청받은 사람에게 알림기능으로 알리기
  });
});

module.exports = router;
