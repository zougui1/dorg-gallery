import bcrypt from 'bcrypt';
import Base64 from '@ronomon/base64';

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

/**
 * convert a buffer into a string
 * @param {any} buffer
 */
export const bufferToBase64 = (buffer: any) => {
  const encodedBuffer = Base64.encode(buffer);
  return encodedBuffer.toString('ascii');
}
