function funky(o) {
  o = null;
}

var x = [];
funky(x);

console.log(x);
// x will be a [ ].
// The funcky function just gets an empty array, assigns it to o
// and changes it's value to null. It does not touch x.
