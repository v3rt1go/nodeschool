// Write a function that takes a binary function, and makes it callable
// with two invocations

var applyf = function applyf(formula) {
  return function(a, b) {
    return formula(a, b);
  };
};

var add = function add(a, b) {
  return a + b;
};
var mul = function mul(a, b) {
  return a * b;
};


var foo = applyf(add);
console.log(foo(5, 6));

// The above solution works, and it's probably more logical but
// in the course the following example is given, that takes a and b
// as separate arguments

var applyf2 = function applyf2(binary) {
  return function(a) {
    return function(b) {
      return binary(a, b);
    };
  };
};

// Then we can call
var bar = applyf2(add);
console.log(bar(3)(4));

// or

console.log(applyf2(mul)(5)(6));
