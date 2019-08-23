import { io, debug } from '../config';
import { On as UserOn } from './User';
import { On as ImageOn } from './Image';
import { On as TagOn } from './Tag';


io.on('connection', socket => {
  debug.socket('connection');

  // User listeners
  UserOn.signup(socket);
  UserOn.login(socket);

  // Tag listeners
  TagOn.getAllTags(socket);

  // Image listeners
  ImageOn.uploadImage(socket);
  ImageOn.getImagesPage(socket);
  ImageOn.getImageById(socket);
  ImageOn.getImagesCount(socket);

});
