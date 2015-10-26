// write a factory function that returns two functions that implement the
// up/down counter
// counter = counterf(10);
// counter.inc(); // 11
// counder.dec(); // 10

var counterf = function (x) {
  return {
    inc: function() {
      return ++x;
    },
    dec: function() {
      return --x;
    }
  };
};

var counter = counterf(10);
console.log(counter.inc());
console.log(counter.dec());
