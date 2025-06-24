const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a Task (Write)
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

// Get All Tasks (Read)
router.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json(tasks);
});

module.exports = router;

