const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  status: Boolean,
  user: {                // 🔗 Relationship here
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Task', TaskSchema);
