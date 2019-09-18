import { Document } from 'mongoose';

export type SocketListener = (socket: SocketIO.Socket) => void;
export type SocketErrorListener = (socket: SocketIO.Socket, error: string) => void;
export type SocketSendDocument = (socket: SocketIO.Socket, document: Document) => void;
export type SocketSendDocuments = (socket: SocketIO.Socket, documents: Document[]) => void;
