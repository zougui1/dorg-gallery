const cloudinary = require('cloudinary');
const api = require('./api');
const { cloud_name, api_key, api_secret } = api.cloudinary;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

module.exports = cloudinary;
