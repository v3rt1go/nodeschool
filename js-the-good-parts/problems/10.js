// Write demethodize = a function that converts a method to a binary function
// demethodize(Number.prototype.add)(5, 6); // 11

var add = function (x, y) {
  return x + y;
};

var methodize = function methodize(binary) {
  return function (x) {
    return binary(this, x);
  };
};

Number.prototype.add = methodize(add);

console.log(Number.prototype.add.toString());

var demethodize = function demethodize(method) {
  return function(that, y) {
    return method.call(that, y);
  };
};

// In ES6 we can write it like so accepting multiple params
//var demethodize = function demethodize(method) {
  //return function(that, ...y) {
    //return method.apply(that, y);
  //};
//};

console.log(demethodize(Number.prototype.add)(5, 6));

