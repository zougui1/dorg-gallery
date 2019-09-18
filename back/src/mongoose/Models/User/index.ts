import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { hasher } from '../../../utils';
import { ComparePasswordCallback } from './user.types';
const salt = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
    }],
    default: []
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  blacklist: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }],
    default: []
  }
});

// is called before a document is saved
userSchema.pre('save', function (next) {
  // used to avoid error from the fact the property 'password' isn't defined
  // in the interface 'Document'
  const self: any = this;

  // if the password is not modified we don't want to do anything
  if (!this.isModified('password')) {
    return next();
  }

  // hash the password then replace the old one with the hash
  hasher(salt, self.password)
    .then(hash => {
      self.password = hash;
      next();
    })
    .catch(next);
});

/**
 * compare the password in the current document with another
 * @api public
 * @param {String} candidatePassword password to test with the password in the document
 * @returns {Promise<Boolean>}
 */
userSchema.methods.comparePassword = function (candidatePassword: string) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) throw err;

      resolve(isMatch);
    });
  });
}

const User = mongoose.model('User', userSchema);

export {
  userSchema,
  User,
};
