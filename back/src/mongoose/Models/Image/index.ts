import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxlength: 150
  },
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
  rate: {
    type: String,
    trim: true,
    lowercase: true,
    default: 'general',
    enum: ['general', 'suggestive', 'nsfw'],
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: () => new Date() // set the current date as default
  }
});

const Image = mongoose.model('Image', imageSchema);

export {
  imageSchema,
  Image,
};
