import openSocket from 'socket.io-client';

let url;

if (/localhost/.test(window.location)) url = 'http://localhost:8000';
else url = 'https://dorg-gallery.zougui.fr:8000';

const socket = openSocket(url, { secure: true });

export default socket;
