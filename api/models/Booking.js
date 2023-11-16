const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  place : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Place',
  },
  user : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  checkIn : {
    type: Date,
    required: true,
  },
  checkOut : {
    type: Date,
    required: true,
  },
  price : {
    type: Number,
    required: true,
  },
  guests : {
    type: Number,
    required: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
