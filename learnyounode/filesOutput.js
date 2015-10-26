'use strict';

// Given two process arguments: directory and ext use the fileLister module to
// get a filtered list of files by extension and output the files one by one to
// the console

const lister = require('./fileLister');
const outputToConsole = (file) => console.log(file);

lister(process.argv[2], process.argv[3], (err, files) => {
  if (err) throw err;

  files.forEach(outputToConsole);
});
