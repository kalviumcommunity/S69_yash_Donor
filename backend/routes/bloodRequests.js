const express = require('express');
const router = express.Router();
const BloodRequest = require('../models/BloodRequest');
const { validateRequest } = require('../middleware/validate');

// GET all blood requests (filter by bloodType/urgency)
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

// GET single blood request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new blood request
router.post('/', validateRequest, async (req, res) => {
  const { patientName, bloodType, unitsRequired, hospital, urgency, contact } = req.body;

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



// PUT update blood request (e.g., mark as fulfilled)
router.put('/:id', async (req, res) => {
  try {
    const { status, unitsFulfilled } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (unitsFulfilled) updateData.unitsFulfilled = unitsFulfilled;

    const updatedRequest = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;