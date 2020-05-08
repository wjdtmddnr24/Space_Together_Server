/* eslint-disable new-cap */
const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  id: {type: Number, required: true},
  name: {type: String, required: true},
  image_url: {type: String, default: 'default_restaurant.png'},
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
