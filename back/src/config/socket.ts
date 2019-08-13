import socket from 'socket.io';
import { http, https } from './server';

export const io = socket(https || http);
