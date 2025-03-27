const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest');
const { validateRequest } = require('../middleware/validate');

// GET all blood requests (existing)
router.get('/', async (req, res) => {
  try {
    const { bloodType, urgency } = req.query;
    const filter = {};
    if (bloodType) filter.bloodType = bloodType;
    if (urgency) filter.urgency = urgency;

    const requests = await BloodRequest.find(filter);
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single blood request by ID (existing)
router.get('/:id', async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




// POST new blood request (new)
router.post('/', validateRequest, async (req, res) => {
  const { 
    patientName, 
    bloodType, 
    unitsRequired, 
    hospital, 
    urgency, 
    contact 
  } = req.body;

  try {
    const newRequest = new BloodRequest({
      patientName,
      bloodType,
      unitsRequired,
      hospital,
      urgency,
      contact,
      status: "Pending",
      createdAt: new Date()
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;