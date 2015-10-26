/* global $ */
'use strict';
// This is the ex4 exercise completed but using the OLOO pattern instead of the
// constructor pattern

var Widget = {
  init: function(width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
  },
  insert: function($where) {
    if (this.$elem) {
      this.$elem.css({
        width: this.width + "px",
        height: this.height + "px"
      }).appendTo($where);
    }
  }
};

var Button = Object.create(Widget);

Button.setup = function(width, height, label) {
  // With OLOO pattern it's easier to delegate calls as long as we don't use the
  // same name for the functions
  // delegate call to Widget
  this.init(width, height);
  this.label = label || "Default";

  // Assign our $elem
  this.$elem = $('<button>').text(this.label);
};
Button.build = function($where) {
  // delegate call
  this.insert($where);
  // assign the click handler. Bind this.
  this.$elem.click(this.onClick.bind(this));
};
Button.onClick = function(evt) {
  console.log("Button '" + this.label + "' was clicked!");
};

// Define and render our buttons
$(document).ready(function() {
  var $body = $(document.body);

  var btn1 = Object.create(Button);
  btn1.setup(100, 50, "Hello");

  var btn2 = Object.create(Button);
  btn2.setup(200, 100, "World");

  btn1.build($body);
  btn2.build($body);
});
