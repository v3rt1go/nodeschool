'use strict';

// This program concatenates a stream from a http get request from a given url
// and returns the number of characters from the response and the full response
// on a second line

const http = require('http');
const bl = require('bl');

http.get(process.argv[2], (res) => {
  res.on('err', console.error);

  res.pipe(bl((err, data) =>  {
    if (err) throw err;

    data = data.toString();
    console.log(data.length);
    console.log(data);
  }));
});
