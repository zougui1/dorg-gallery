import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
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

export {
  tagSchema,
  Tag,
};
