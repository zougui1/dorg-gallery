const { http, https } = require('./server');
const io = require('socket.io')(https || http);

module.exports = io;
