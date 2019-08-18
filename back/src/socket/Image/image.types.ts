import { Document } from 'mongoose';

export type SocketAndNumber = (socket: SocketIO.Socket, count: number) => void;
export type SendImage = (socket: SocketIO.Socket, image: (Document | null) | Document[]) => void;
