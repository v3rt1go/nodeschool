'use strict';

// This program listens for requests on two separate urls /api/parsetime and
// /api/unixtime and returns a json string with just the hour, minutes and
// seconds from the given iso querystring value. The first url sends an iso
// formated date and the other ulr sends a unix epoch timestamps

const http = require('http');
const url = require('url');
const port = +process.argv[2];

const urlParser = function urlParse(reqUrl) {
  const parsedUrl = url.parse(reqUrl, true);
  return {
    path: parsedUrl.pathname,
    date: parsedUrl.query.iso
  };
};

const parseIsoDate = function parseIsoDate(isoDate, unix) {
  const d = new Date(isoDate),
    hour = d.getHours(),
    minute = d.getMinutes(),
    seconds = d.getSeconds();

  if (unix) {
    return { unixtime: d.getTime() };
  }

  return {
    hour: hour,
    minute: minute,
    second: seconds
  };
};

const server = http.createServer((req, res) => {
  const parsedUrl = urlParser(req.url);

  let parsedTime = {};
  if (parsedUrl.path === '/api/unixtime') {
    parsedTime = parseIsoDate(parsedUrl.date, true);
  } else {
    parsedTime = parseIsoDate(parsedUrl.date);
  }

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(parsedTime));
});
server.listen(port);
