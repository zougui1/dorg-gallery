import express from 'express';
import fs from 'fs';
import { debug } from './debug';

const app = express();
let https: any;
let http: any;
let options: any = {};
const port = 8000;

// use of https module with SSL when in production
// use of http module when not in production
if(process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/zougui.fr/privkey.pem').toString();
  const certificate = fs.readFileSync('/etc/letsencrypt/live/zougui.fr/fullchain.pem').toString();
  const ca = fs.readFileSync('/etc/letsencrypt/live/zougui.fr/cert.pem').toString();

  options = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  https = require('https').createServer(options, app);
  https.listen(port, debug.https(`server listening on port %o`, port));
} else {
  const http = require('http').Server(app);
  http.listen(port, debug.http(`server listening on port %o`, port));
}

export {
  http,
  https,
  express,
  app,
  port,
};
