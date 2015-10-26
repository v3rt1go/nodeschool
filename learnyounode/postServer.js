'use strict';

// This program is a server that accepts only post requests and returns the body
// of the post converted to uppercase

const http = require('http');
const map = require('through2-map');
const port = process.argv[2];

// We define the function that will handle converting the POST body to uppercase
var converter = map(function (chunk) {
  return chunk.toString().toUpperCase();
});

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    req.pipe(converter).pipe(res);
  } else {
    res.end('send me a POST \n');
  }
});

server.listen(port);

