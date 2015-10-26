'use strict';

// This program creates a http server that serves files from the given path.
// The file path is provided as the second argument, and the port to listen on
// is provided as the first argument. The program serves the file in a reasable
// stream

const fs = require('fs');
const http = require('http');
const port = process.argv[2];
const path = process.argv[3];

const server = http.createServer((req, res) => {
  res.writeHead(200, {'content-type': 'text/plain'});
  fs.createReadStream(path).pipe(res);
});
server.listen(port);
