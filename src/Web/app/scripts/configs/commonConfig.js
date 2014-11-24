(function() {
  'use strict';

  // name is handy for logging
  var injections = ['commonConfigProvider', 'config'];

  // Define the factory on the module.
  // Inject the dependencies.

  function instance(commonConfig,appConfig) {
    commonConfig.config.controllerActivateSuccessEvent = appConfig.events.controllerActivateSuccess;
    commonConfig.config.levels = appConfig.levels;
  }

  injections.push(instance);
  angular.module('app').config(injections);
})();
