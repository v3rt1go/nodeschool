'use strict';

// The module pattern is by far the most popular becuse of it's simplicity and
// ease of use. It offers private and public functions and variables. One
// drawback of the module pattern is that with each new "instance" of the module
// we actually create new functions - so we duplicate the function definitions,
// data vars etc. instead of linking to one existing set as the constructor or
// oloo patterns do. However, this is not a big problem because in js we rearly
// need to create more than 1 - 2 instances of a module in the same program.
// The module pattern also offers better 'this' binding than the constructor
// pattern

var foo = (function foo() {
  // Private funcitons and vars can go here

  var publicApi = {
    bar: function() {
      publicApi.baz();
    },
    baz: function() {
      console.log('baz');
    }
  };

  return publicApi;
});

foo.bar(); // baz

// modern module pattern:
// takes advantage of a third barty library that defines our initialization
// function instead of relying on the iife to call it
// define here is a placeholder for our third party library

define("foo", function() {
  var o = { bar: "bar" };

  return {
    bar: function() {
      console.log(o.bar);
    }
  };
});
