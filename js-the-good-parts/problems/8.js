// Without writing any new functions show 3 ways to create the inc function

var inc = function inc(x) {
  return ++x;
};

console.log(inc(5)); // 6
console.log(inc(inc(5))); //7
