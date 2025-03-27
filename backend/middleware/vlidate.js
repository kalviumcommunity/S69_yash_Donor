// Validators for blood requests
exports.validateRequest = (req, res, next) => {
    if (!req.body.bloodType || !req.body.unitsRequired) {
      return res.status(400).json({ 
        message: "Missing required fields: bloodType and unitsRequired" 
      });
    }
    next();
  };
  
  // Validators for donors
  exports.validateDonor = (req, res, next) => {
    if (!req.body.bloodType || !req.body.phone) {
      return res.status(400).json({ 
        message: "Missing required fields: bloodType and phone" 
      });
    }
  
    // Basic phone validation (10 digits)
    if (!/^\d{10}$/.test(req.body.phone)) {
      return res.status(400).json({ 
        message: "Phone must be 10 digits" 
      });
    }
    next();
  };    