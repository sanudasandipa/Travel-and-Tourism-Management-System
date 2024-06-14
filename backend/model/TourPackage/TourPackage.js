const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  package_name: {
    type: String,
    required: true
  },
  customer_name: {
    type: String,
    required: true
  },
  customer_NIC: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  NOF_person: {
    type: Number,
    required: true
  }
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
