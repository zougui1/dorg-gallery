import { io, debug } from '../config';
import { On as UserOn } from './User';
import { On as ImageOn } from './Image';


io.on('connection', socket => {
  debug.socket('connection');

  // User listeners
  UserOn.signup(socket);
  UserOn.login(socket);

  // Image listeners
  ImageOn.uploadImage(socket);
  ImageOn.getImagesPage(socket);
  ImageOn.getImageById(socket);

});
