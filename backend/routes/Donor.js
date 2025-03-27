const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');
const { validateDonor } = require('../middleware/validate');

// GET donors by location (existing)
router.get('/', async (req, res) => {
  try {
    const { city, bloodType } = req.query;
    const filter = {};
    if (city) filter.city = city;
    if (bloodType) filter.bloodType = bloodType;

    const donors = await Donor.find(filter);
    res.status(200).json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST register new donor (new)
router.post('/', validateDonor, async (req, res) => {
  const { 
    name, 
    bloodType, 
    email, 
    phone, 
    city, 
    lastDonationDate 
  } = req.body;

  try {
    const newDonor = new Donor({
      name,
      bloodType,
      email,
      phone,
      city,
      lastDonationDate,
      isActive: true,
      registeredAt: new Date()
    });

    await newDonor.save();
    res.status(201).json(newDonor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;