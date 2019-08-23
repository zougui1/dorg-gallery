import socket from 'socket.io';
import { server } from './server';

export const io = socket(server);
