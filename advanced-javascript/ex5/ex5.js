'use strict';

function fakeAjax(url, cb) {
  var fake_responses = {
    "file1": "The first text",
    "file2": "The middle text",
    "file3": "The last text"
  };
  var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

  console.log("Requesting: " + url);

  setTimeout(function() {
    cb(fake_responses[url]);
  }, randomDelay);
}

function output(text) {
  console.log(text);
}

// **************************************
var Promise = require('bluebird');
var files = ["file1", "file2", "file3"];

function getFile(file) {
  return new Promise(function(resolve) {
    fakeAjax(file, resolve);
  });
}

//var p1 = getFile("file1");
//var p2 = getFile("file2");
//var p3 = getFile("file3");

//p1
  //.then(output)
  //.then(function() {
    //return p2;
  //})
  //.then(output)
  //.then(function() {
    //return p3;
  //})
  //.then(output)
  //.then(function() {
    //output("Completed");
  //});

Promise.map(files, getFile)
  .reduce(function(chain, filePromise) {
    return chain
    .then(function() {
      return filePromise;
    })
    .then(output);
  }, Promise.resolve())
  .then(function() {
    output('Complete ...');
  });
//// The old-n-busted callback way

//function getFile(file) {
  //fakeAjax(file, function(text) {
    //fileReceived(file, text);
  //});
//}

//function fileReceived(file, text) {
  //// haven't received this text yet?
  //if (!responses[file]) {
    //responses[file] = text;
  //}

  //var files = ["file1", "file2", "file3"];

  //// loop through responses in order for rendering
  //for (var i = 0; i < files.length; i++) {
    //// response received?
    //if (files[i] in responses) {
      //// response needs to be rendered?
      //if (responses[files[i]] !== true) {
        //output(responses[files[i]]);
        //responses[files[i]] = true;
      //}
    //}
    //// can't render yet
    //else {
      //// not complete!
      //return false;
    //}
  //}

  //output("Complete!");
//}

//// hold responses in whatever order they come back
//var responses = {};

//// request all files at once in "parallel"
//getFile("file1");
//getFile("file2");
//getFile("file3");
