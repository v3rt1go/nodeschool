'use strict';

(function() {

  function C() {
    console.log("OOPS!");
  }

  function E(f) {
    console.log("E");
    var f = F;
    f();
  }

  function A() {
    console.log("A");
    B();
  };

  var C;

  function G() {
    console.log("G");

    var H = function() {
      console.log("H");
      I();
    };
    H();
  }

  //var D = d;

  function D() {
    console.log("D");
    E(F);
  }

  function I() {
    console.log("I");
    J();
    J();
  }

  function B() {
    console.log("B");
    C();
  };

  function F() {
    console.log("F");
    G();
  };

  var rest = "KLMNOPQRSTUVWXYZ".split(""), obj = {};
  for (var i=0; i<rest.length; i++) {
    (function(i){
      // define the current function
      obj[rest[i]] = function() {
        console.log(rest[i]);
        if (i < (rest.length-1)) {
          obj[rest[i + 1]]();
        }
      };
    })(i);
  }

  var J = function() {
    J = function() {
      console.log("J");
      obj.K();
    };
  };

  function C() {
    console.log("C");
    D();
  };

  return A;
}()());
