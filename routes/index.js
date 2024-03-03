/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
