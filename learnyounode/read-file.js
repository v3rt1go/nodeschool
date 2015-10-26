'use strict';

let fs = require('fs');
let path = process.argv[2];

// This will read synchronously a file from the given path and return
// the number of new lines it contains
let fileContents = fs.readFileSync(path, 'utf8');
if (fileContents) {
  let lines = fileContents.split('\n').length - 1;
  console.log(lines);
} else {
  console.log('Could not read file or file is empty');
}
