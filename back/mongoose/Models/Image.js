const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  link: {
    type: String,
    required: true,
    trim: true
  },
  thumb: {
    type: String,
    required: true,
    trim: true
  },
  canvas: {
    text: {
      type: String,
      trim: true
    },
    draw: {
      type: String,
      trim: true
    }
  },
  tags: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }],
    default: []
  },
  property: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'general',
    enum: ['general', 'nsfw'],
  },
  artist: {
    name: {
      type: String,
      trim: true,
      maxlength: 60,
      default: 'unknown'
    },
    link: {
      type: String,
      trim: true
    },
  },
  characterName: {
    type: String,
    trim: true,
    maxlength: 60,
    default: 'unknown'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    maxlength: 5000
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = {
  imageSchema,
  Image,
};
