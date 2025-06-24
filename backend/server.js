const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB error", err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
