const mongoose = require('mongoose');

const DonorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bloodType: { 
    type: String, 
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, validate: {
    validator: (v) => /^\d{10}$/.test(v),
    message: 'Phone must be 10 digits'
  }},
  city: { type: String, required: true },
  lastDonationDate: { type: Date },
  isActive: { type: Boolean, default: true },
  registeredAt: { type: Date, default: Date.now }
});




module.exports = mongoose.model('Donor', DonorSchema);