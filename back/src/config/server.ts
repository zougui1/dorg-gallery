import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import { argv } from 'yargs';
import { debug } from './debug';

const app = express();
let server: http.Server | https.Server;
let options: any = {};
const port = 8000;

// use of https module with SSL when in production
// use of http module when not in production
if (process.env.NODE_ENV === 'production') {
  const privateKey = fs.readFileSync(process.env.CERT_PATH + 'privkey.pem').toString();
  const certificate = fs.readFileSync(process.env.CERT_PATH + 'fullchain.pem').toString();
  const ca = fs.readFileSync(process.env.CERT_PATH + 'cert.pem').toString();

  options = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };

  server = new https.Server(options, app);
} else {
  server = new http.Server(app);
}

// only start the server if we really want to start it
if (argv['server-start']) {
  server.listen(port, () => debug.server(`server listening on port %o`, port));
}

export {
  server,
  express,
  app,
  port,
};
