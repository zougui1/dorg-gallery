import bcrypt from 'bcrypt';

/**
 * hash a string using bcrypt
 */
export const hasher = (salt: number, clearString: string) => new Promise((resolve, reject) => {
  bcrypt.genSalt(salt, function (err, salt) {
    if (err) return reject(err);

    bcrypt.hash(clearString, salt, function (err, hash) {
      if (err) return reject(err);

      resolve(hash);
    });
  });
});
