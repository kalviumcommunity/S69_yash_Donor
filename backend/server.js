const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('DB connection error:', err));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
const taskRoutes = require('./routes/task');
app.use('/api', taskRoutes);
