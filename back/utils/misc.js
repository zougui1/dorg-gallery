const bcrypt = require('bcrypt');

const hasher = (salt, clearString) => new Promise((resolve, reject) => {
  bcrypt.genSalt(salt, function (err, salt) {
    if (err) return reject(err);

    bcrypt.hash(clearString, salt, function (err, hash) {
      if (err) return reject(err);

      resolve(hash);
    });
  });
});

module.exports = {
  hasher,
};
