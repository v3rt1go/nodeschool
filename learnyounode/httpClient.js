'use strict';

// This function reads data from a given url and outputs every data event to the
// console

const http = require('http');

http.get(process.argv[2], (res) => {
  res.setEncoding('utf8');

  res.on('err', console.error);
  // We can pass directly a function without calling it and the callback will
  // handle passing data to the function and call it
  // res.on('data', (chunk) => console.log(chunk));
  res.on('data', console.log);
  //res.on('end', () => console.log('Finished processing content ...'));
}).on('error', (err) => {
  console.log('Got err while processing url: ', err);
});
