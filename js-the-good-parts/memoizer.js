// Memoizers are like caches, but for mathematical calculations
// A formula will be looked up in the memoizer function and if it was
// calculated before it's value will be returned, else it will be added

function memoizer(memo, formula) {
  var recur = function(n) {
    // check if we have the result first
    var result = memo[n];
    if (typeof result !== 'number') {
      // if result is not found (not calcualted) apply the formula
      // and calculate
      result = formula(recur, n);
      // assign the result to the memo for future reference
      memo[n] = result;
    }
    return result;
  };
  return recur;
}

var factorial = memoizer([1, 1], function(recur, n) {
  return n * recur(n - 1);
});

var fibonacci = memoizer([0, 1], function(recur, n) {
  return recur(n - 1) + recur(n - 2);
});
