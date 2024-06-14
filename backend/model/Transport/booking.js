// booking.js (or whatever you want to name the file)
const mongoose = require('mongoose');

const bookingSchema =  mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  vehicleCode: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  passengers: {
    type: Number,
    required: true
  },
  withDriver: {
    type: String,
    enum: ['with', 'without'], // Assuming only two options for driver presence
    required: true
  },
  transactionId: {
    type: String,
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
