'use strict';

let fs = require('fs');
let path = require('path');
let pathToDir = process.argv[2];
let ext = '.'+process.argv[3];

// Get all files from the path
fs.readdir(pathToDir, (err, files) => {
  if (err) throw err;
  files.filter(hasSameExt).forEach(logOutput);
});

// Function to check if extension matches
var hasSameExt = (file) => path.extname(file) === ext;
var logOutput = (value) => console.log(value);

