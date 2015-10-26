'use strict';

// We are provided with 3 urls as args. We need to http.get all of them and
// output to console the finished data for each of them, in the order they have
// returned

const http = require('http');
const bl = require('bl');
const dataPusher = callbackHandler();

for (var i=0; i < process.argv.length - 2; i++) {
  // We have to call the http.get from a different function, like we're doing
  // here becasue if we put http.get inside this loop then by the time the first
  // callback returns the value of i would have changed due to the async nature
  // of http.get.
  // If we try to put a counter inside bl the first url that returns will
  // increment the count, and that will also mess up our results. The only
  // relable way of keeping the index is if we call http.get from an external
  // function and assign to it it's specific index value
  httpGet(i);
}

function httpGet(index) {
  http.get(process.argv[2 + index], (res) => {
    res.on('error', console.error);

    res.pipe(bl((err, data) => {
      if (err) throw err;
      dataPusher(index, data.toString());
    }));
  });
}

function callbackHandler() {
  let counter = 0;
  let dataStore = [];
  return function pushData(index, value) {
    dataStore[index] = value;
    counter++;

    if (counter === 3) {
      printOutput(dataStore);
    }
  };
}

function printOutput(dataStore) {
  for (var i=0; i < dataStore.length; i++) {
    console.log('displaying', i);
    console.log(dataStore[i]);
  }
}


// The given solution is simpler and easier to read
//let results = [];
//let count = 0;

//function printResults() {
  //for (var i=0; i < results.length; ++i) {
    //console.log(results[i]);
  //}
//}

//function httpGet(index) {
  //http.get(process.argv[2 + index], (res) => {
    //res.pipe(bl((err, data) => {
      //if (err) throw err;

      //results[index] = data.toString();
      //count++;

      //if (count === 3) {
        //printResults();
      //}
    //}));
  //});
//}

//for (var i=0; i < 3; i++) {
  //httpGet(i);
//}
