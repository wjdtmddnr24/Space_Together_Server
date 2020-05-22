/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const friendRouter = require('./friendRouter');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/friend', friendRouter);

module.exports = router;
