'use strict';

// This module exports a function that takes three argumens: a directory, a
// file extension and a callback.
// It passes to the callback the list of files filtered by the given extension
// as an Array.

const fs = require('fs');
const path = require('path');

const lister = (dirname, ext, callback) => {
  // Simple function to check if file has matching exception
  const hasMatchingExt = (value) => path.extname(value) === '.'+ext;

  fs.readdir(dirname, (err, files) => {
    if (err) return callback(err, null);

    const results = files.filter(hasMatchingExt);
    return callback(null, results);
  });
};
module.exports = lister;
