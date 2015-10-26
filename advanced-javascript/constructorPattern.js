'use strict';

// A constructor makes an object linked to its own prototype. It is a very
// powerful and complex pattern but it is one of the most difficult to master
// and work with. This bining and management is very difficult with this pattern
// and it's key to it working properly. It allows of features as shadowing or
// overriding / super methods. It is the closest thing to the normal class
// design pattern that is used in other programming languages, but because of
// this it kind of goes against the core ideea of how prototypes work and how js
// is built to function. Because of it's complexity it is not so widely used as
// the module pattern, but there are times when some operations can only be
// achieved or just make more sense is being used with the constructor pattern.
// It is very good when working with many instances of an object because
// differently from the module pattern that copies - hence creating multiple
// copies - of the same functions and patterns, the constructor pattern actually
// links the instances to the prototype of the constructor so only one actual
// object exists, that is being linked to all its instances
// If only linking and instancing is desired, and there is no need for shadowing
// and overriding methods it might be better to use the OLOO pattern

// This is the constructor function - sometimes called the init function
function Foo(who) {
  this.me = who;
}

Foo.prototype.identify = function() {
  return "I am " + this.me;
};

var a1 = new Foo("a1");
var a2 = new Foo("a2");

a2.speak = function() {
  console.log("Hello, " + this.identify() + ".");
};

console.log(a1.identify()); // I am a1
a2.speak(); // Hello, I am a2

// Demonstration on how linkage works in constructor pattern
// Foo is the constructor/init function. Prototype is the object that sits
// behind the function and is created with each function or when new keyword is
// used. The prototype is the one that actually matters
// The __proto__ property is readonly and represents a link to the parent
// prototype object
a1.constructor === Foo;
a1.constructor === a2.constructor;
a1.__proto__ === Foo.prototype;
a1.__proto__ === a2.__proto__;
a1.__proto__ === Object.getPrototypeOf(a1);
// In ES3 we don't have __proto__ so we can get the linkage like so:
// This is hacky, errorprone since both prototype and constructor are writable
// and it's not recommended, but we can do it if we need to support ES3
a1.__proto__ === a2.constructor.prototype;
a1.prototype !== a2.prototype;
a1 !== a2;

// Shadowing - is like overriding a method from an inherited class. But in js it
// actually means creating a method on a prototype with the same name as the
// method from the linked prototype

a1.identify = function() {
  // We are calling the identify method from the Foo prototype but we are
  // assigning this to the a1 function. We need to assign this explicitly here
  // because if we would just call Foo.identify() this would be Foo instead of
  // a1
  console.log("Shadowing: Hello " + Foo.prototype.identify.call(this) + ".");
};
a1.identify(); // Hello, I am a1;

// There is another way to achieve something similar, the super unicorn magic way, by
// levreging exactly the normal this behavior that we tried to prevent in the
// shadowing example. The drawback of this way is that we have to define the
// methods on the parent prototype object

Foo.prototype.speak = function() {
  console.log("Hello, " + this.identify() + ".");
};
// This works because of the way we call speak. Since a1 is the caller, this
// will be assigned to a3.
var a3 = new Foo("a3");
a3.speak(); // Hello, I am a3;

// Using super unicorn magic with linked objects && linking objects:

// We define a new constructor function
var Bar = function(who) {
  // We call the Foo constructor function, but we assign this to Bar
  // This is somewhat similar to a super method from inheritance
  Foo.call(this, who);
};

// We link the Bar prototype to the Foo prototype using Object.create.
// Object.create is different than using the new keyword because it only creates
// a new object and sets the [[Prototype]] link to the targetet object, but does
// not call the constructor function, set the this keyword or return the result
// of the execution or undefined.
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.speak = function() {
  console.log("Hello, " + this.identify() + ".");
};

var b1 = new Bar('b1');
var b2 = new Bar('b2');

b1.speak(); // Hello, I am b1
b2.speak(); // Hello, I am b2

// Constructor pattern gotcha:
// good this handling and understanding in constructor pattern is key. For this
// we need to take extra care when calling functions from event handlers like
// we're often doing when using jQuery to explicit / hardbind this to what we
// want

$("#speak").click(a1.speak); // This will be the button or event instead of a1
// Depending on the scope of where we call this, this should be our desired a1
$("#speak").click(a1.speak.bind(this));
// If we have direct access to a1 we could explicitly bind this to a1
$("#speak").click(a1.speak.bind(a1));
