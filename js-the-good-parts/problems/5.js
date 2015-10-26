// Write a function that adds from 2 invocations

var add = function add(a) {
  return function idf(b) {
    return a + b;
  };
};

console.log(add(3)(4));
