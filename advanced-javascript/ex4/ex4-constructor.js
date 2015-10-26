/* global $ */
'use strict';

function Widget(width, height) {
  this.width = width || 50;
  this.height = height || 50;
  // This holds the space for $elem but it is assigned from the function that
  // will use it, in our case the Button
  this.$elem = null;
}

Widget.prototype.render = function($where) {
  if (this.$elem) {
    this.$elem.css({
      width: this.width + "px",
      height: this.height + "px"
    }).appendTo($where);
  }
};

function Button(width, height, label) {
  // In the current ES5 version of js we don't have a super method to call
  // the inherited/linked constructor method so we have to do this:
  Widget.call(this, width, height);
  this.label = label;
  this.$elem = $('<button>').text(this.label);
}

Button.prototype.render = function($where) {
  // We have set this.$elem in our Button constructor function so now render
  // will work
  Widget.prototype.render.call(this, $where);
  // After we have rendered our button we need to bind our click event handler
  // to listen for the click event
  this.$elem.click(this.onClick.bind(this));
  // When the click event is triggered our button will call the onClick function
  // we've define below. The bind is the es5 bind that allows us to pass
  // a this reference to a function without actually calling/executing the
  // function like we would do with call/apply. We have to do this else the this
  // that will be passed to the onClick function will be the click event handler
  // or something else, but not the actual button what we want.
};

Button.prototype.onClick = function(evt) {
  console.log("Button '" + this.label + "' was clicked!");
};

$(document).ready(function(){
  var $body = $(document.body);
  var btn1 = new Button(100, 50, 'Hello');
  var btn2 = new Button(200, 100, 'World');

  btn1.render($body);
  btn2.render($body);
});
