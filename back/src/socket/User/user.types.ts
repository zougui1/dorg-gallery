import { UserModel } from '../../mongoose/Models/User/user.types';

interface UserObject {
  _id: string;
  name: string
}

export type EmitUserObject = (socket: SocketIO.Socket, user: UserObject) => void;
export type EmitLogged = (socket: SocketIO.Socket, user: UserModel) => void;
