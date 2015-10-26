// Write a function that allows another function to only be called once
// add_once = once(add);
// add_once(3, 4) // 7
// add_once(3, 4) // throw

var add = function (x, y) {
  return x + y;
};
var mul = function (x, y) {
  return x * y;
};

//var once = function (binary) {
  //var called = false;
  //return function(x, y) {
    //if (!called) {
      //called = true;
      //return binary(x, y);
    //} else {
      //throw 'already called';
    //}
  //};
//};

//var add_once = once(add);
//console.log(add_once(3, 4));
//console.log(add_once(3, 4));

// The above work, but the given solution is more elegant:
var once2 = function (binary) {
  return function () {
    // The first time this is run we set binary to f
    var f = binary;
    // then we set binary to null. The next time this is run binary will be null
    // and so will f
    binary = null;
    // and below will throw
    return f.apply(this, arguments);
  };
};

var add_once2 = once2(add);
console.log(add_once2(5, 6));
console.log(add_once2(5, 6));
