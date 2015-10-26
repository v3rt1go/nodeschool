'use strict';

// The singleton pattern is useful when we want to make sure that no matter how
// many copies/instances we create, they all reference the same instance. It's
// useful when we want to create a Router, or an instance of a db connection

// The MODULE singleton pattern
var ModuleRouter = function () {
  // Singleton!
  if (ModuleRouter.__instance__) {
    return ModuleRouter.__instance__;
  }

  var routes = {};
  function setRoute(match, fn) {
    routes[match] = fn;
  }

  var publicApi = Router.__instance__ = {
    setRoute: setRoute
  };
  return publicApi;
};

var myModuleRouter = new ModuleRouter();
var anotherModuleRouter = new ModuleRouter();
myModuleRouter === anotherModuleRouter;

// The CONSTRUCTOR singleton pattern
var Router = function () {
  // Singleton!
  // The __instance__ property references the exact same instance that was
  // originally created
  if (Router.__instance__) {
    return Router.__instance__;
  }

  Router.__instance__ = this;
  this.routes = {};
};

Router.prototype.setRoute = function (match, fn) {
  this.routes[match] = fn;
};

var myRouter = new Router();
var another = new Router();
myRouter === another;
