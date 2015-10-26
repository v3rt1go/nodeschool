// Write a function that takes an argument and returns a function
// that returns that argument

var identity = function identity(n) {
  return function() {
    return n;
  };
};

var idf = indentity(3);
console.log(idf());
