const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
