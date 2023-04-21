const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  
  otp: { type: String },
  createdAt: { type: Date },
  expiresAt: { type: Date }
});

const otpModel = mongoose.model('otp', otpSchema);

module.exports = otpModel;