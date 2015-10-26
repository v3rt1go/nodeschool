// Write a function that takes a function and an argument, and returns a
// function tha can supply a second argument
//
// Example:
// add3 = curry(add, 3);
// add3(4) // returns a 7
// curry(mul, 5)(6) // returns 30

var curry = function curry(binary, x) {
  return function (y) {
    return binary(x, y);
  };
};

var add = function(x, y) {
  return x + y;
};

var mul = function mul(x, y) {
  return x * y;
};

var add3 = curry(add, 3);
console.log(add3(4));

console.log(curry(mul, 5)(6));

var applyf2 = function applyf2(binary) {
  return function(a) {
    return function(b) {
      return binary(a, b);
    };
  };
};

// Creating an inc function:
//var inc1 = function(x) {
  //return add(x, 1);
//};
//var inc2 = function(x) {
  //return curry(add, 1)(x);
//};
//var inc3 = function(x) {
  //return applyf2(add)(1)(x);
//};
var inc1 = add(1);
var inc2 = curry(add, 1);
var inc3 = applyf2(add)(1);

console.log('Increments ...');
//console.log(inc1(5));
console.log(inc2(5));
console.log(inc3(5));
//console.log(inc1(inc1(5)));
console.log(inc2(inc2(5)));
console.log(inc3(inc3(5)));



// We can extend this to accept any number of arguments like so:
// However, this is ugly to write because arguments is not really
// an array and we have to do some extra work - like calling slice from
// Array.prototype.slice on arguments
var longCurry = function longCurry(binary) {
  var slice = Array.prototype.slice,
    args = slice.call(arguments, 1);

  return function() {
    return binary.apply(
      null,
      args.concat(slice.call(arguments, 0))
    );
  };
};

// In ES6 we can write something simillar to this:
//var es6Curry = function (binary, ...first) {
  //return function (...second) {
    //return binary(...first, ...second); // I don't think this actually works ...
  //}
//}
