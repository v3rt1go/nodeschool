// Write a function 'twice' that takes a binary function and returns a unary
// function that passes its arguments to the binary function twice
// var double = twice(add);
// double(11) //22
// var square = twice(mul);
// square(11) //121

var add = function (x, y) {
  return x + y;
};
var mul = function (x, y) {
  return x * y;
};

var twice = function (binary) {
  return function(x) {
    return binary(x, x);
  };
};

var double = twice(add);
var square = twice(mul);

console.log(double(11));
console.log(square(11));

// Write a function 'composeu' that takes two unary functions and returns a
// unary function that calls them both
// compuseu(double, square)(3); // 36

var composeu = function(func1, func2) {
  return function(x) {
    return func2(func1(x));
  };
};

console.log(composeu(double, square)(3));

// Write a function composeb that takes two binary functions and returns a
// function that calls them both
// composeb(add, mul)(2, 3, 5) // 25

var composeb = function (func1, func2) {
  return function(x, y, z) {
    return func2(func1(x, y), z);
  };
};

console.log(composeb(add, mul)(2, 3, 5));
