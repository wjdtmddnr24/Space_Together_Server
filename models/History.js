/* eslint-disable new-cap */
const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
  meeting: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  restaurantInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  visitedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('History', historySchema);
