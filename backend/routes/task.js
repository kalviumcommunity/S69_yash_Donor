const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a task with a user ID
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body); // Ensure 'user' field is included
  await task.save();
  res.status(201).json(task);
});

// Get tasks with user details populated
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find().populate('user'); // Relationship in action
  res.status(200).json(tasks);
});

module.exports = router;
