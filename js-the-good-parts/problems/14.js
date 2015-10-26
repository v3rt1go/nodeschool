// Take a revocable function that takes a nice function, and returns a revoke
// function that denies access to the nice function, and an invoke function that
// can invoke the nice function until it is revoked
// temp = revocable(alert);
// temp.invoke(7); //alert: 7
// temp.revoke();
// temp.invoke(8); //alert: 8

var alert = function (x) {
  return 'alert: ' + x;
};

var revocable = function (func) {
  return {
    revoke: function() {
      func = null;
    },
    invoke: function() {
      // We use apply instead of calling directly to allow us to pass all the
      // arguments from the arguments array instead of a sepcified amount of
      // them
      return func.apply(this, arguments);
    }
  };
};

// We could extend this, and if we would want to allow the function to be called
// only for a limited period of time, we could call inside the invoke function
// the revoke function with setTimeout and the period of time. This would allow
// the function to be invoked for a specified amount of time, after which it
// will be revoked

var temp = revocable(alert);

console.log(temp.invoke(7));
console.log(temp.invoke(7));
console.log(temp.revoke());
console.log(temp.invoke(8));
console.log(temp.invoke(8));
