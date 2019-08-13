import { Document } from 'mongoose';

export type SocketListener = (socket: SocketIO.Socket) => void;

export type SocketErrorListener = (socket: SocketIO.Socket, error: Error | string) => void;

export type SocketAndNumber = (socket: SocketIO.Socket, count: number) => void;

export type SocketAndDocument = (socket: SocketIO.Socket, document: Document) => void;
export type SocketAndDocuments = (socket: SocketIO.Socket, document: Document[]) => void;
