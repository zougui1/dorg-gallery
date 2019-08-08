const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { hasher } = require('../../utils');
const salt = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// is called before a document is saved
userSchema.pre('save', function (next) {
  // if the password is not modified we don't want to do anything
  if (!this.isModified('password')) {
    return next();
  }

  // hash the password then replace the old one with the hash
  hasher(salt, this.password)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(next);
});

// compare the password in the current document with another
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return callback(err);

    callback(null, isMatch);
  });
}

const User = mongoose.model('User', userSchema);

module.exports = {
  userSchema,
  User,
};
