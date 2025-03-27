const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Database Connection
connectDB();

// Test Route
app.get('/', (req, res) => {
  res.send('Donor Hive API Running');
});

// Routes
app.use('/api/blood-requests', require('./routes/bloodRequests'));
app.use('/api/donors', require('./routes/donors'));

module.exports = app;