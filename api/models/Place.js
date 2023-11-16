const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: String,
  about: String,
  country: String,
  streetAddr: String,
  city: String,
  region: String,
  postalCode: String,
  inTime: String,
  outTime: String,
  guestCount: Number,
  price: Number,
  addedPhotos: [String],
  perks: [String],
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
