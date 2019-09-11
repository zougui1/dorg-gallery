import openSocket from 'socket.io-client';

let url;
let port;

if (process.env.NODE_ENV === 'production') port = 8001;
else port = 8000;

if (/localhost/.test(window.location)) url = 'http://localhost:' + port;
else url = 'https://dorg-gallery.zougui.fr:' + port;

const socket = openSocket(url, { secure: true });

export default socket;
