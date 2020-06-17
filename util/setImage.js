const fs = require('fs-extra');
const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
  console.log('Connected to DB');
  exec().then();
});

mongoose.connect('mongodb://odyssey:odyssey2020!@115.68.221.40:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const files = fs.readdirSync('public/images/');
async function exec() {
  const restaurants = await Restaurant.find({});
  for (const restaurant of restaurants) {
    const id = restaurant.id;
    const file = files.find((filename) => filename.startsWith(`${id}.`));
    if (file) {
      restaurant.image_url = file;
      await restaurant.save();
    }
  }
  console.log('done');
}
