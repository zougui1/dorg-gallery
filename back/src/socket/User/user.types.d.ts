import { Document } from 'mongoose';
import { UserModel } from '../../mongoose/Models/User/user.types';

interface UserObject {
  _id: string;
  name: string
}

export type EmitUserObject = (socket: SocketIO.Socket, user: Document | null) => void;
export type EmitLogged = (socket: SocketIO.Socket, user: UserModel) => void;
