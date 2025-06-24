const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// Routes
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

app.use('/api', userRoutes);
app.use('/api', taskRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
