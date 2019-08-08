const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 20,
    lowercase: true
  }
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = {
  tagSchema,
  Tag,
};
