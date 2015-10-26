// This is a nice way to achieve both inheritance and power constructor pattern

function gizmo(id) {
  return {
    id: id,
    toString: function() {
     return "gizmo " + this.id;
    }
  };
}

// This is the power constructor pattern with functional inheritance:
function hoozit(id) {
  // We could also add private variables and functions here
  // and access them with the privileged functions that
  // extend the that object returned

  // no need to call gizmo with new it will act as a singleton
  var that = gizmo(id);
  // we extend the gizmo object (inheritance)
  that.test = function (testid) {
    // here this reffernces the id of the gizmo instance
    return testid === this.id;
  };
  return that;
}

// We could share data (secrets) between the two functions like so:
// simulating package scope
function gizmo(id, secret) {
  // define a default value for secret
  secret = secret || {};
  secret.id = id;
  return {
    toString: function() {
      return "gizmo " + secret.id;
    }
  };
}

function hoozit(id) {
  var secret = {};
  var that = gizmo(id, secret);
  // secret.id is created on the gizmo function call above
  // since we are extending the returned gizmo object in that
  // we can test for secret.id, knowing that this exists since when
  // we used the gizmo() function call
  that.test = function(testid) {
    return testid === secret.id;
  };
}

// Super methods

function gizmo(id, secret) {
  secret = secret || {};
  secret.id = id;
  return {
    toString: function() {
     return "gizmo " + secret.id;
    }
  };
}

function hoozit(id) {
  var secret = {};
  var that = gizmo(id, secret);
  // This is the original toString method from gizmo
  var super_toString = that.toString;

  // Now we extend with our own methods
  that.test = function(testId) {
    return testId === secret.id;
  };
  // Or extend existing methods
  that.toString = function () {
    // write our own code and finally call the original
    // toString method on the that object
    return super_toString.apply(that);
  };
}

