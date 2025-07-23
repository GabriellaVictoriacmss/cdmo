const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  author: String,
  message: String,
  data: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  }
}, {
  collection: 'messagens_collection'
});

module.exports = mongoose.model('Message', messageSchema);
