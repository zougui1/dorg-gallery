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

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  hasher(salt, this.password)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(next);
});

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
