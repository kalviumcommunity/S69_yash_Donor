const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

// Example: protected route
router.get('/tasks', authenticateToken, async (req, res) => {
  // You can now access `req.user`
  res.json({ message: `Tasks for user: ${req.user.username}` });
});

module.exports = router;
