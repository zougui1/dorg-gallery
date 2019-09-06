import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const imageSchema = new mongoose.Schema({
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
  },
  createdAt: {
    type: Date,
    default: () => new Date() // set the current date as default
  }
});

//imageSchema.plugin(autopopulate);
const Image = mongoose.model('Image', imageSchema);

export {
  imageSchema,
  Image,
};
