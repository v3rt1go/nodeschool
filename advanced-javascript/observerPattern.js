'use strict';

// This is the observer pattern. It works by emitting and listening to events.
// This pattern is very popular in vanilla nodejs programming and async patterns

var Router = function Router() {
  // This is a dummy functions to demonstrate how we can inject data in this
  // pattern
};

// Below is the observer pattern
function PageController(router) {
  this.router = router;
  // We expect our router to emit the navigate event
  // we need to hardbind this to avoid being set to the event emitter instead of
  // the PageController object
  this.router.on("navigate", this.fetchPage.bind(this));
}

PageController.prototype.fetchPage = function(d) {
  $.ajax({
    url: d.page_url
  }).done(this.loaded.bind(this, d.page_url)); // d.page_url is the 2nd argument of the loaded function
};

PageController.prototype.loaded = function(d, u) {
  // display the page content
  // do other magic when data is loaded
  this.router.emit("pageLoaded", u);
};

var router = new Router();
var thepage = new PageController();
