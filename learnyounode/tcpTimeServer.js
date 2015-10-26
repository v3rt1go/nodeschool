'use strict';

// This program will createa a TCP time server that outputs the current date and
// time on the conncetion socket then closes the socket.
// For this we will use the net package - not http, because we don't need that.
// The net server returns a duplex stream - that's both readeable and writable.

const net = require('net');
const strftime = require('strftime');
const port = +process.argv[2];

const server = net.createServer((socket) => {
  socket.end(strftime("%Y-%m-%d %H:%M", new Date()));
});
server.listen(port);

