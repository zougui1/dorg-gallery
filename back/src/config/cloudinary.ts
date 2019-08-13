import cloudinary from 'cloudinary';
import { api } from './api';
const { cloud_name, api_key, api_secret } = api.cloudinary;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});
