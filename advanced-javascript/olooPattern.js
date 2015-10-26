'use strict';

// The Object Link to Other Object pattern was invented by Kyle Simpson recently
// and currently is not very wide spread compared to the other js programming
// patterns. It is meant to be a more native way of programming js, with a
// pattern that functions in the way JS was originally design, and not mimic the
// patterns of class oriented programming languages. It relies on links between
// objects and less on constructor functions etc. It offers mostly the same
// benefints of the constructor pattern, except shadowing - but can work with
// super unicorm magic. While not as flexible as the constructor pattern is a
// lot more lightweight, solves the issue of multiple instances where the module
// pattern lacks, by linking objects, not creating new ones. When we don't need
// to override methods at the children level we could safely go with the oloo
// pattern. It also does not require complicated this management in order to
// function properly
//
// In the OLOO pattern we do not use the new keyword, to avoid this management.
// We work primarly with objects and use exclusively Object create then call an
// init function.

// First we define an utility object that will hold the methods we want to link
// to
var Foo = {
  init: function(who) {
    this.me = who;
  },
  identify: function() {
    return "I am " + this.me;
  },
  talk: function() {
    console.log("Yo, " + this.identify() + ".");
  }
};

var a1 = Object.create(Foo);
a1.init('a1');
var a2 = Object.create(Foo);
a2.init('a2');

a1.talk();
a2.talk();

// To link objects we create a new util object that will link to the parent util
// object
var Bar = Object.create(Foo);
// Here we can extend with our own methods
Bar.speak = function() {
  console.log("Hello, " + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init('b1');
var b2 = Object.create(Bar);
b2.init('b2');

b1.talk();
b1.speak();
b2.talk();
b2.speak();
