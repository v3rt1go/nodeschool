// Write methodize - a function that converts a binary function to a method
// Number.prototype.add = methodize(add);
// (3).add(4); // 7

var add = function (x, y) {
  return x + y;
};

var methodize = function methodize(binary) {
  return function (x) {
    return binary(this, x);
  };
};

// In ES6 we can extend this to accept any number of arguments with ...
//var methodize = function methodize(func) {
  //return function(...x) {
    //return func(this, ...x);
  //};
//};

Number.prototype.add = methodize(add);

console.log((3).add(4));
