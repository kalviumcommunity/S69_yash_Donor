const mongoose = require('mongoose');

const BloodRequestSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  bloodType: { 
    type: String, 
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  unitsRequired: { type: Number, required: true, min: 1 },
  hospital: { type: String, required: true },
  urgency: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  contact: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Fulfilled'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});



module.exports = mongoose.model('BloodRequest', BloodRequestSchema);